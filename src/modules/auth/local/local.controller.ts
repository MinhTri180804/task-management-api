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
import { LoginDTO } from '../dto/login';

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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ResponseSuccessMessage('Login successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  login(
    @Request() req: { user: Omit<User, 'password'> },
    @Body() data: LoginDTO,
  ) {
    return this._authLocalService.login({
      user: req.user,
      deviceId: data.deviceId,
    });
  }
}
