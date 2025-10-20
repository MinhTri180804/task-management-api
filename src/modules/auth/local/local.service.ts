import { CacheService } from '@core/cache/cache.service';
import { SendMailQueueService } from '@core/messageQueue/queues/sendMail/send-mail.queue.service';
import { UserService } from '@modules/user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register';
import { generateSecurePin } from '@util/generateSecurePin.util';
import { ResendOTPVerifyEmailRegisterDTO } from '../dto/resend-otp-verify-email-register.dto';

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
      // TODO: optimization params exception
      throw new BadRequestException({
        message: 'Email already exists in the system',
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
}
