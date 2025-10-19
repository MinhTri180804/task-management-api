import { Body, Controller, Post } from '@nestjs/common';
import { AuthLocalService } from './local.service';
import { EmailRegisterDTO } from '../dto/email-register.dto';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';

@Controller('auth/local')
export class AuthLocalController {
  constructor(private readonly _authLocalService: AuthLocalService) {}

  @Post('register/email')
  @ResponseSuccessMessage('Send OTP to your email successfully')
  async sendOTPVerifyEmailRegister(@Body() emailRegisterDTO: EmailRegisterDTO) {
    await this._authLocalService.sendOTPVerifyRegister({
      email: emailRegisterDTO.email,
    });
    return;
  }
}
