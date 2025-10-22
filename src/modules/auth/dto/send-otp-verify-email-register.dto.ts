import { Trim } from '@shared/decorators/trim.decorator';
import { IsEmail } from 'class-validator';

export class SendOTPVerifyEmailRegisterDTO {
  @IsEmail()
  @Trim()
  email: string;
}
