import { Trim } from '@shared/decorators/trim.decorator';
import { IsEmail } from 'class-validator';

export class ResendOTPVerifyEmailRegisterDTO {
  @IsEmail()
  @Trim()
  email: string;
}
