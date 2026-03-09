import { ResendConfig, ResendConfigName } from '@config/resend.config';
import { ForgotPasswordTokenCacheService } from '@infrastructure/cache/forgot-password-token/forgot-password-token.service';
import { SetPasswordTokenCacheService } from '@infrastructure/cache/set-password-token/set-password-token.service';
import { VerifyEmailRegisterCacheService } from '@infrastructure/cache/verify-email-register/verify-email-register.service';
import { JWTAccessTokenService } from '@infrastructure/jwt/accessToken/access-token.service';
import { JWTForgotPasswordTokenService } from '@infrastructure/jwt/forgot-password-token/forgot-password-token.service';
import { JWTRefreshTokenService } from '@infrastructure/jwt/refreshToken/refresh-token.service';
import { JwtSetPasswordTokenService } from '@infrastructure/jwt/setPasswordToken/set-password-token.service';
import { SendMailQueueService } from '@infrastructure/messageQueue/queues/sendMail/send-mail.queue.service';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TooManyRequestsException } from '@shared/exceptions/too-many-request.exception';
import { generateSecurePin } from '@shared/utils/generateSecurePin.util';
import {
  getMillisecondRemainingTimeFromExp,
  getSecondRemainingTimeFromExp,
} from '@shared/utils/get-remaining-time-from-exp.util';
import { comparePassword } from '@shared/utils/password.util';
import { remainingMS } from '@shared/utils/remaining-ms.util';
import { AuthMethodEnum } from '@core/enum/auth-method.enum';
import {
  ForgotPasswordParams,
  LoginParams,
  LoginReturn,
  ResendOTPVerifyRegisterParams,
  ResendOTPVerifyRegisterReturn,
  ResetPasswordParams,
  SendOTPVerifyRegisterParams,
  SendOTPVerifyRegisterReturn,
  SetPasswordParams,
  SetPasswordReturn,
  ValidateParams,
  ValidateReturn,
  VerifyOTPEmailRegisterParams,
  VerifyOTPEmailRegisterReturn,
} from './local.service.type';

@Injectable()
export class AuthLocalService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
    private readonly _sendMailQueueService: SendMailQueueService,
    private readonly _jwtSetPasswordTokenService: JwtSetPasswordTokenService,
    private readonly _jwtAccessTokenService: JWTAccessTokenService,
    private readonly _jwtRefreshTokenService: JWTRefreshTokenService,
    private readonly _jwtForgotPasswordTokenService: JWTForgotPasswordTokenService,
    private readonly _verifyEmailRegisterCacheService: VerifyEmailRegisterCacheService,
    private readonly _setPasswordTokenCacheService: SetPasswordTokenCacheService,
    private readonly _forgotPasswordCacheService: ForgotPasswordTokenCacheService,
  ) {}

  async sendOTPVerifyRegister({
    email,
  }: SendOTPVerifyRegisterParams): Promise<SendOTPVerifyRegisterReturn> {
    // 1. Check if user already exists
    const userByEmail = await this._userService.findByEmail({ email });

    if (userByEmail) {
      return;
    }

    // 2. Check if OTP already exists for this email
    const verifyExist = await this._verifyEmailRegisterCacheService.exist({
      email,
    });

    if (verifyExist) {
      throw new ConflictException(
        'An OTP has already been sent to this email.',
      );
    }

    // 3. Generate new OTP
    const otpVerify = generateSecurePin(6);

    // 4. Store OTP in cache
    const { createdAt } = await this._verifyEmailRegisterCacheService.set({
      email,
      otp: otpVerify,
    });

    // 5. Calculate expiration time
    const expiresAt = this._verifyEmailRegisterCacheService.getExpiresAt({
      createdAt,
    });

    // 6. Send OTP via email
    await this._sendMailQueueService.verifyEmailRegister({
      otp: otpVerify,
      expiredAt: expiresAt,
      email,
    });

    return;
  }

  async resendOTPVerifyRegister({
    email,
  }: ResendOTPVerifyRegisterParams): Promise<ResendOTPVerifyRegisterReturn> {
    // 1. Check if resend interval has passed
    const { verifyEmailRegister: resendIntervalVerifyEmailRegisterSecond } =
      this._configService.getOrThrow<ResendConfig>(ResendConfigName);

    const RESEND_INTERVAL_SECOND =
      resendIntervalVerifyEmailRegisterSecond * 1000;

    const cache = await this._verifyEmailRegisterCacheService.get({
      email,
    });

    if (!cache) {
      throw new BadRequestException(
        'OTP has expired or does not exist. Please request a new verification.',
      );
    }

    // 2. Check if enough time has passed since last OTP was sent
    const { createdAt } = cache;
    const remainingTimeMS = remainingMS(
      createdAt,
      RESEND_INTERVAL_SECOND * 1000,
    );
    if (remainingTimeMS > 0) {
      throw new TooManyRequestsException({
        details: {
          remainingTimeMS,
        },
      });
    }

    // 3. Generate new OTP
    const newOtp = generateSecurePin(6);

    // 4. Update cache with new OTP
    const { createdAt: newCreatedAt } =
      await this._verifyEmailRegisterCacheService.set({
        email,
        otp: newOtp,
      });

    // 5. Calculate new expiration time
    const newExpiresAt = this._verifyEmailRegisterCacheService.getExpiresAt({
      createdAt: newCreatedAt,
    });

    // 6. Send new OTP via email
    await this._sendMailQueueService.verifyEmailRegister({
      otp: newOtp,
      expiredAt: newExpiresAt,
      email,
    });

    return;
  }

  async verifyOTPEmailRegister({
    email,
    otp,
  }: VerifyOTPEmailRegisterParams): Promise<VerifyOTPEmailRegisterReturn> {
    // 1. Verify OTP
    const isMatchOTP = await this._verifyEmailRegisterCacheService.isMatch({
      email,
      otp,
    });

    if (!isMatchOTP) {
      throw new BadRequestException('Invalid OTP');
    }

    // 2. Create user
    const user = await this._userService.create({
      email,
      is_email_verified: true,
      local_auth_enabled: true,
      primary_auth_method: AuthMethodEnum.LOCAL,
    });

    // 3. Generate set password token
    const setPasswordToken = this._jwtSetPasswordTokenService.sign({
      email: email,
      userId: user._id.toHexString(),
    });

    // 4. Extract token details
    const { exp: setPasswordTokenExpiresAt, jti: setPasswordTokenId } =
      this._jwtSetPasswordTokenService.decode(setPasswordToken);

    // 5. Calculate token TTL
    const expiresMilliseconds = getSecondRemainingTimeFromExp(
      setPasswordTokenExpiresAt,
    );

    // 6. Generate token ID
    const tokenId = this._setPasswordTokenCacheService.getTokenId({
      userId: user._id.toHexString(),
      jti: setPasswordTokenId,
    });

    // 7. Store token in cache
    await this._setPasswordTokenCacheService.set({
      tokenId,
      ttl: expiresMilliseconds,
    });

    // 8. Send success email with set password link
    await this._sendMailQueueService.verifiedEmailRegisterSuccessfully({
      email: user.email,
      setPasswordToken,
      expiresAt: setPasswordTokenExpiresAt,
    });

    // 9. Clean up OTP cache
    await this._verifyEmailRegisterCacheService.revoke({ email });

    return {
      userId: user._id.toHexString(),
      setPasswordToken: setPasswordToken,
    };
  }

  async setPassword({
    password,
    setPasswordToken,
  }: SetPasswordParams): Promise<SetPasswordReturn> {
    // 1. Verify set password token
    const { sub, jti: setPasswordTokenId } =
      this._jwtSetPasswordTokenService.verify(setPasswordToken);

    // 2. Get token ID
    const tokenId = this._setPasswordTokenCacheService.getTokenId({
      userId: sub,
      jti: setPasswordTokenId,
    });

    // 3. Check if token exists
    const isExist = await this._setPasswordTokenCacheService.exist({
      tokenId,
    });

    if (!isExist) {
      throw new BadRequestException('Invalid set password token');
    }

    // 4. Get user by ID
    const user = await this._userService.findOne(sub);

    if (!user) {
      throw new BadRequestException('User set password not found');
    }

    // 5. Check if user already has a password
    if (user.password) {
      throw new ConflictException(
        'Password has already been set. Please log in instead.',
      );
    }

    // 6. Set the user's password
    await this._userService.setPassword(user, password);

    // 7. Invalidate & Revoke the token
    await this._setPasswordTokenCacheService.revoke({
      tokenId: setPasswordTokenId,
    });

    return;
  }

  async validate({ email, password }: ValidateParams): Promise<ValidateReturn> {
    const user = await this._userService.findByEmail({ email });

    if (!user) return null;

    if (!user.password) return null;

    const isMatchPassword = await comparePassword({
      password,
      hashPassword: user.password,
    });

    if (!isMatchPassword) return null;
    delete user.password;

    return user;
  }

  login({ user, deviceId }: LoginParams): LoginReturn {
    // 1. Generate access token
    const accessToken = this._jwtAccessTokenService.sign({
      userId: user._id!.toHexString(),
      email: user.email,
      deviceId,
      isEmailVerified: user.is_email_verified,
      localAuthEnabled: user.local_auth_enabled,
      primaryAuthMethod: user.primary_auth_method,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    });

    // 2. Generate refresh token
    const refreshToken = this._jwtRefreshTokenService.sign({
      userId: user._id!.toHexString(),
      deviceId,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword({ email }: ForgotPasswordParams) {
    // 1. Check user exist
    const user = await this._userService.findByEmail({ email });

    if (!user) {
      return;
    }

    // 2. Check if user has local authentication enabled
    if (!user.local_auth_enabled) {
      // TODO: Send email notification user enable local authentication and try again
      return;
    }

    // 3. Check if user has set a password
    if (!user.password) {
      // TODO: Send email notification user set password and try again
      return;
    }

    // 4. Generate forgot password token
    const userID = user._id!.toHexString();

    const forgotPasswordToken = this._jwtForgotPasswordTokenService.sign({
      userId: userID,
      email,
    });

    const { exp: forgotPasswordTokenExp, jti: forgotPasswordTokenId } =
      this._jwtForgotPasswordTokenService.decode(forgotPasswordToken);

    const expiresMilliseconds = getMillisecondRemainingTimeFromExp(
      forgotPasswordTokenExp,
    );

    // 5. Store the token in cache
    await this._forgotPasswordCacheService.set({
      tokenId: forgotPasswordTokenId,
      ttl: expiresMilliseconds,
    });

    // 6. Send forgot password email
    await this._sendMailQueueService.forgotPassword({
      email,
      forgotPasswordToken,
      expiresAt: expiresMilliseconds,
    });

    return;
  }

  async resetPassword({ token, newPassword }: ResetPasswordParams) {
    // 1. Verify the token
    const { jti: forgotPasswordTokenId, sub: userId } =
      this._jwtForgotPasswordTokenService.verify(token);

    const isForgotPasswordTokenExist =
      await this._forgotPasswordCacheService.exist({
        tokenId: forgotPasswordTokenId,
      });

    if (!isForgotPasswordTokenExist) {
      throw new BadRequestException('Invalid or expired reset password token');
    }

    // 2. Find user by ID
    const userById = await this._userService.findOne(userId);
    if (!userById) {
      throw new BadRequestException('User not found');
    }

    // 3. Update user password
    await this._userService.setPassword(userById, newPassword);
    // 4. Invalidate the token
    await this._forgotPasswordCacheService.revoke({
      tokenId: forgotPasswordTokenId,
    });

    return;
  }
}
