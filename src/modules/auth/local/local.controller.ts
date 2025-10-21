import { Body, Controller, Post } from '@nestjs/common';
import { AuthLocalService } from './local.service';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register.dto';
import { ResendOTPVerifyEmailRegisterDTO } from '../dto/resend-otp-verify-email-register.dto';

@Controller('auth/local')
export class AuthLocalController {
  constructor(private readonly _authLocalService: AuthLocalService) {}

  @Post('register/verify-email/send-otp')
  @ResponseSuccessMessage('Send OTP to your email successfully')
  async sendOTPVerifyEmailRegister(
    @Body() sendOTPVerifyEmailRegisterDTO: SendOTPVerifyEmailRegisterDTO,
  ) {
    await this._authLocalService.sendOTPVerifyRegister({
      email: sendOTPVerifyEmailRegisterDTO.email,
    });
    return;
  }

  @Post('register/verify-email/resend-otp')
  @ResponseSuccessMessage('Resend OTP to your email successfully')
  async resendOTPVerifyEmailRegister(
    @Body() resendOTPVerifyEmailRegisterDTO: ResendOTPVerifyEmailRegisterDTO,
  ) {
    await this._authLocalService.resendOTPVerifyRegister({
      email: resendOTPVerifyEmailRegisterDTO.email,
    });

    return;
  }
}
