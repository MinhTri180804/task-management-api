import { IsEmail } from 'class-validator';

export class VerifyEmailRegisterDTO {
  @IsEmail()
  email: string;
}
