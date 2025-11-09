import { CacheWhiteListService } from '@core/cache/whitelist/cache-white-list.service';
import { JwtSetPasswordTokenService } from '@core/jwt/setPasswordToken/set-password-token.service';
import { SendMailQueueService } from '@core/messageQueue/queues/sendMail/send-mail.queue.service';
import { AuthMethodEnum } from '@enum/auth-method.enum';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TooManyRequestsException } from '@shared/exceptions/too-many-request.exception';
import { ValidationRequestException } from '@shared/exceptions/validation-request.exception';
import { generateSecurePin } from '@util/generateSecurePin.util';
import { remainingMS } from '@util/remaining-ms.util';
import { ResendOTPVerifyEmailRegisterDTO } from '../dto/resend-otp-verify-email-register.dto';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register.dto';

type VerifyOTPEmailRegisterParams = {
  email: string;
  otp: string;
};

type SetPasswordParams = {
  password: string;
  passwordConfirm: string;
  setPasswordToken: string;
};

@Injectable()
export class AuthLocalService {
  constructor(
    private readonly _userService: UserService,
    private readonly _cacheWhitelistService: CacheWhiteListService,
    private readonly _sendMailQueueService: SendMailQueueService,
    private readonly _jwtSetPasswordTokenService: JwtSetPasswordTokenService,
  ) {}

  async sendOTPVerifyRegister({ email }: SendOTPVerifyEmailRegisterDTO) {
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
      await this._cacheWhitelistService.getVerifyEmailRegister({
        email,
      });

    if (verifyExist) {
      throw new ConflictException(
        'An OTP has already been sent to this email.',
      );
    }

    const otpVerify = generateSecurePin(6);

    const { expiredAt } =
      await this._cacheWhitelistService.saveVerifyEmailRegister({
        email,
        otp: otpVerify,
      });

    await this._sendMailQueueService.verifyEmailRegister({
      otp: otpVerify,
      expiredAt,
      email,
    });
  }

  async resendOTPVerifyRegister({ email }: ResendOTPVerifyEmailRegisterDTO) {
    const RESEND_INTERVAL_MS = 30000;
    const cache = await this._cacheWhitelistService.getVerifyEmailRegister({
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
      await this._cacheWhitelistService.saveVerifyEmailRegister({
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

  async verifyOTPEmailRegister({ email, otp }: VerifyOTPEmailRegisterParams) {
    const otpCache = await this._cacheWhitelistService.getVerifyEmailRegister({
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

    await this._sendMailQueueService.verifiedEmailRegisterSuccessfully({
      email: user.email,
      setPasswordToken,
    });

    await this._cacheWhitelistService.deleteVerifyEmailRegister({ email });

    return { userId: user._id, setPasswordToken: setPasswordToken };
  }

  async setPassword({
    password,
    passwordConfirm,
    setPasswordToken,
  }: SetPasswordParams) {
    const { sub } = this._jwtSetPasswordTokenService.verify(setPasswordToken);

    if (!sub) {
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
  }
}
