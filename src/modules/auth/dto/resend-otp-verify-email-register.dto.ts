import { IsEmail } from 'class-validator';

export class ResendOTPVerifyEmailRegisterDTO {
  @IsEmail()
  email: string;
}
