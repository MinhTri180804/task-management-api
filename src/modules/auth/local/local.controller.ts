import { Body, Controller, Post } from '@nestjs/common';
import { AuthLocalService } from './local.service';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register.dto';
import { ResendOTPVerifyEmailRegisterDTO } from '../dto/resend-otp-verify-email-register.dto';
import { VerifyOTPEmailRegisterDTO } from '../dto/verify-otp-email-register.dto';
import { SetPasswordDTO } from '../dto/set-password.dto';

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

  @Post('register/verify-email')
  @ResponseSuccessMessage('Verify email otp successfully')
  async verifyOTPEmailRegister(@Body() data: VerifyOTPEmailRegisterDTO) {
    const { userId, setPasswordToken } =
      await this._authLocalService.verifyOTPEmailRegister({
        email: data.email,
        otp: data.otp,
      });

    return {
      userId,
      setPasswordToken: setPasswordToken,
    };
  }

  @Post('register/set-password')
  @ResponseSuccessMessage('Set password for your account successfully')
  async setPassword(@Body() data: SetPasswordDTO) {
    await this._authLocalService.setPassword({
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      setPasswordToken: data.setPasswordToken,
    });

    return {
      accessToken: 'mock',
      refreshToken: 'mock',
    };
  }
}
