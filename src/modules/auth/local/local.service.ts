import { CacheService } from '@core/cache/cache.service';
import { JWTInitProfileTokenService } from '@core/jwt/initProfileToken/init-profile.token.service';
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

@Injectable()
export class AuthLocalService {
  constructor(
    private readonly _userService: UserService,
    private readonly _cacheService: CacheService,
    private readonly _sendMailQueueService: SendMailQueueService,
    private readonly _jwtInitProfileTokenService: JWTInitProfileTokenService,
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

    const verifyExist = await this._cacheService.getVerifyEmailRegister({
      email,
    });

    if (verifyExist) {
      throw new ConflictException(
        'An OTP has already been sent to this email.',
      );
    }

    const otpVerify = generateSecurePin(6);

    const { expiredAt } = await this._cacheService.saveVerifyEmailRegister({
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
    const cache = await this._cacheService.getVerifyEmailRegister({ email });
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

    const { expiredAt } = await this._cacheService.saveVerifyEmailRegister({
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
    const otpCache = await this._cacheService.getVerifyEmailRegister({ email });

    if (!otpCache) {
      throw new NotFoundException('OTP not found or expired');
    }

    const isMatchOTP = otpCache.otp === otp;

    if (!isMatchOTP) {
      throw new BadRequestException('Invalid OTP');
    }

    await this._cacheService.deleteVerifyEmailRegister({ email });

    const user = await this._userService.create({
      email,
      is_email_verified: true,
      local_auth_enabled: true,
      primary_auth_method: AuthMethodEnum.LOCAL,
    });

    const initProfileToken = this._jwtInitProfileTokenService.sign({
      userId: String(user._id),
      email: user.email,
    });

    await this._userService.update(String(user._id), {
      token_init_profile: initProfileToken,
    });

    const { exp } = this._jwtInitProfileTokenService.decode(initProfileToken);

    await this._sendMailQueueService.createProfileRegister({
      email: user.email,
      expiresIn: exp,
      token: initProfileToken,
    });

    return { initProfileToken };
  }
}
