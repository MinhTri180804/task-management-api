import { CACHE_SERVICE_TOKEN } from '@core/cache/cache.token';
import { type ISetPasswordTokenCacheWhiteListService } from '@core/cache/whitelist/set-password-token/set-password.token.service';
import { type IVerifyEmailRegisterCacheWhiteListService } from '@core/cache/whitelist/verify-email-register/verify-email-register.service';
import { JWTAccessTokenService } from '@core/jwt/accessToken/access-token.service';
import { JWTRefreshTokenService } from '@core/jwt/refreshToken/refresh-token.service';
import { JwtSetPasswordTokenService } from '@infrastructure/jwt/setPasswordToken/set-password-token.service';
import { SendMailQueueService } from '@infrastructure/messageQueue/queues/sendMail/send-mail.queue.service';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TooManyRequestsException } from '@shared/exceptions/too-many-request.exception';
import { ValidationRequestException } from '@shared/exceptions/validation-request.exception';
import { generateSecurePin } from '@shared/utils/generateSecurePin.util';
import { comparePassword } from '@shared/utils/password.util';
import { remainingMS } from '@shared/utils/remaining-ms.util';
import { AuthMethodEnum } from 'src/core/enum/auth-method.enum';
import {
  LoginParams,
  LoginReturn,
  ResendOTPVerifyRegisterParams,
  ResendOTPVerifyRegisterReturn,
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
    private readonly _userService: UserService,
    private readonly _sendMailQueueService: SendMailQueueService,
    private readonly _jwtSetPasswordTokenService: JwtSetPasswordTokenService,
    private readonly _jwtAccessTokenService: JWTAccessTokenService,
    private readonly _jwtRefreshTokenService: JWTRefreshTokenService,

    @Inject(CACHE_SERVICE_TOKEN.WHITE_LIST.SET_PASSWORD_TOKEN)
    private readonly _setPasswordTokenCacheWhiteListService: ISetPasswordTokenCacheWhiteListService,

    @Inject(CACHE_SERVICE_TOKEN.WHITE_LIST.VERIFY_EMAIL_REGISTER)
    private readonly _verifyEmailRegisterCacheWhitelistService: IVerifyEmailRegisterCacheWhiteListService,
  ) {}

  async sendOTPVerifyRegister({
    email,
  }: SendOTPVerifyRegisterParams): Promise<SendOTPVerifyRegisterReturn> {
    const userByEmail = await this._userService.findByEmail({ email });

    if (userByEmail) {
      throw new ValidationRequestException({
        details: [
          {
            field: 'email',
            message: ['Email is exist'],
          },
        ],
      });
    }

    const verifyExist =
      await this._verifyEmailRegisterCacheWhitelistService.get({
        email,
      });

    if (verifyExist) {
      throw new ConflictException(
        'An OTP has already been sent to this email.',
      );
    }

    const otpVerify = generateSecurePin(6);

    const { expiredAt } =
      await this._verifyEmailRegisterCacheWhitelistService.set({
        email,
        otp: otpVerify,
      });

    await this._sendMailQueueService.verifyEmailRegister({
      otp: otpVerify,
      expiredAt,
      email,
    });
  }

  async resendOTPVerifyRegister({
    email,
  }: ResendOTPVerifyRegisterParams): Promise<ResendOTPVerifyRegisterReturn> {
    const RESEND_INTERVAL_MS = 30000;
    const cache = await this._verifyEmailRegisterCacheWhitelistService.get({
      email,
    });
    if (!cache) {
      throw new BadRequestException(
        'OTP has expired or does not exist. Please request a new verification.',
      );
    }

    const { createdAt } = cache;
    const remainingTimeMS = remainingMS(createdAt, RESEND_INTERVAL_MS);
    if (remainingTimeMS > 0) {
      throw new TooManyRequestsException({
        details: {
          remainingTimeMS,
        },
      });
    }

    const newOtp = generateSecurePin(6);

    const { expiredAt } =
      await this._verifyEmailRegisterCacheWhitelistService.set({
        email,
        otp: newOtp,
      });

    await this._sendMailQueueService.verifyEmailRegister({
      otp: newOtp,
      expiredAt,
      email,
    });

    return;
  }

  async verifyOTPEmailRegister({
    email,
    otp,
  }: VerifyOTPEmailRegisterParams): Promise<VerifyOTPEmailRegisterReturn> {
    const otpCache = await this._verifyEmailRegisterCacheWhitelistService.get({
      email,
    });

    if (!otpCache) {
      throw new NotFoundException('OTP not found or expired');
    }

    const isMatchOTP = otpCache.otp === otp;

    if (!isMatchOTP) {
      throw new BadRequestException('Invalid OTP');
    }

    const user = await this._userService.create({
      email,
      is_email_verified: true,
      local_auth_enabled: true,
      primary_auth_method: AuthMethodEnum.LOCAL,
    });

    const setPasswordToken = this._jwtSetPasswordTokenService.sign({
      email: email,
      userId: user._id.toHexString(),
    });

    const { expiresAt } = await this._setPasswordTokenCacheWhiteListService.set(
      {
        userId: user._id.toHexString(),
        token: setPasswordToken,
      },
    );

    await this._sendMailQueueService.verifiedEmailRegisterSuccessfully({
      email: user.email,
      setPasswordToken,
      expiresAt,
    });

    await this._verifyEmailRegisterCacheWhitelistService.del({ email });

    return {
      userId: user._id.toHexString(),
      setPasswordToken: setPasswordToken,
    };
  }

  async setPassword({
    password,
    passwordConfirm,
    setPasswordToken,
  }: SetPasswordParams): Promise<SetPasswordReturn> {
    const { sub } = this._jwtSetPasswordTokenService.verify(setPasswordToken);

    if (!sub) {
      throw new BadRequestException('Invalid set password token');
    }

    const hasInWhiteList =
      await this._setPasswordTokenCacheWhiteListService.get({ userId: sub });

    if (!hasInWhiteList) {
      throw new BadRequestException('Invalid set password token');
    }

    if (hasInWhiteList.token !== setPasswordToken) {
      throw new BadRequestException('Invalid set password token');
    }

    const user = await this._userService.findOne(sub);

    // Check user is exits
    if (!user) {
      throw new BadRequestException('User set password not found');
    }

    // Check user has current password
    if (user.password) {
      throw new ConflictException(
        'Password has already been set. Please log in instead.',
      );
    }

    // Check password confirm match with password
    if (password !== passwordConfirm) {
      throw new ValidationRequestException({
        details: [
          {
            field: 'passwordConfirm',
            message: ['Password confirm not match with password'],
          },
        ],
      });
    }

    await this._userService.setPassword(user, password);

    await this._setPasswordTokenCacheWhiteListService.del({ userId: sub });

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

    const refreshToken = this._jwtRefreshTokenService.sign({
      userId: user._id!.toHexString(),
      deviceId,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
