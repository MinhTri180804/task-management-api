import { CacheService } from '@core/cache/cache.service';
import { SendMailQueueService } from '@core/messageQueue/queues/sendMail/send-mail.queue.service';
import { UserService } from '@modules/user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { EmailRegisterDTO } from '../dto/email-register.dto';
import { generateSecurePin } from '@util/generateSecurePin.util';

@Injectable()
export class AuthLocalService {
  constructor(
    private readonly _userService: UserService,
    private readonly _cacheService: CacheService,
    private readonly _sendMailQueueService: SendMailQueueService,
  ) {}
  async sendOTPVerifyRegister({ email }: EmailRegisterDTO) {
    const userByEmail = await this._userService.findByEmail({ email });

    if (userByEmail) {
      throw new ConflictException('Email already exists in the system');
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
