import { CacheService } from '@core/cache/cache.service';
import { SendMailQueueService } from '@core/messageQueue/queues/sendMail/send-mail.queue.service';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { TooManyRequestsException } from '@shared/exceptions/too-many-request.exception';
import { generateSecurePin } from '@util/generateSecurePin.util';
import { ResendOTPVerifyEmailRegisterDTO } from '../dto/resend-otp-verify-email-register.dto';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register.dto';
import { ValidationRequestException } from '@shared/exceptions/validation-request.exception';

@Injectable()
export class AuthLocalService {
  constructor(
    private readonly _userService: UserService,
    private readonly _cacheService: CacheService,
    private readonly _sendMailQueueService: SendMailQueueService,
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
    const currentTime = Date.now();
    const elapsedTime = currentTime - createdAt;
    if (elapsedTime < RESEND_INTERVAL_MS) {
      const remainingTime = RESEND_INTERVAL_MS - elapsedTime;
      throw new TooManyRequestsException({
        details: {
          remainingTime,
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
}
