import { IsEmail } from 'class-validator';

export class SendOTPVerifyEmailRegisterDTO {
  @IsEmail()
  email: string;
}
