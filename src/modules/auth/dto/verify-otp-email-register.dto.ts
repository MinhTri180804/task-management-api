import { Trim } from '@shared/decorators/trim.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOTPEmailRegisterDTO {
  @IsEmail()
  @Trim()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  otp: string;
}
