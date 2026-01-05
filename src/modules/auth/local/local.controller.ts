import { User } from '@modules/user/entity/user.entity';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';
import { ResendOTPVerifyEmailRegisterDTO } from '../dto/resend-otp-verify-email-register.dto';
import { SendOTPVerifyEmailRegisterDTO } from '../dto/send-otp-verify-email-register.dto';
import { SetPasswordDTO } from '../dto/set-password.dto';
import { VerifyOTPEmailRegisterDTO } from '../dto/verify-otp-email-register.dto';
import { LocalAuthGuard } from './local.guard';
import { AuthLocalService } from './local.service';
import { ResponseSuccessStatus } from '@shared/decorators/response-success-status.decorator';
import { LoginDTO } from '../dto/login.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { ForgotPasswordDTO } from '../dto/forgot-password.dto';

@Controller('auth/local')
export class AuthLocalController {
  constructor(private readonly _authLocalService: AuthLocalService) {}

  @Post('register/verify-email/send-otp')
  @ResponseSuccessMessage(
    'If the email is valid, you’ll receive further instructions.',
  )
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

    return;
  }

  @Post('forgot-password')
  @ResponseSuccessMessage('Forgot password email sent successfully')
  async forgotPassword(@Body() data: ForgotPasswordDTO) {
    await this._authLocalService.forgotPassword({ email: data.email });
    return;
  }

  @Post('reset-password')
  @ResponseSuccessMessage('Reset password successfully')
  async resetPassword(@Body() data: ResetPasswordDTO) {
    await this._authLocalService.resetPassword({
      token: data.resetPasswordToken,
      newPassword: data.newPassword,
    });
    return;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ResponseSuccessMessage('Login successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  login(
    @Body() data: LoginDTO,
    @Request() req: { user: Omit<User, 'password'> },
  ) {
    return this._authLocalService.login({
      user: req.user,
      deviceId: data.deviceId,
    });
  }
}
