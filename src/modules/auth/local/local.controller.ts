import { Body, Controller, Post } from '@nestjs/common';
import { AuthLocalService } from './local.service';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';

@Controller('auth/local')
export class AuthLocalController {
  constructor(private readonly _authLocalService: AuthLocalService) {}

  @Post('register/verify-email/send-otp')
  @ResponseSuccessMessage('Send OTP to your email successfully')
  async sendOTPVerifyEmailRegister(
    @Body() emailRegisterDTO: SendOTPVerifyEmailRegisterDTO,
  ) {
    await this._authLocalService.sendOTPVerifyRegister({
      email: emailRegisterDTO.email,
    });
    return;
  }
}
