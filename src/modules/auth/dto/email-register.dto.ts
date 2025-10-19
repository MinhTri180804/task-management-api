import { IsEmail } from 'class-validator';

export class EmailRegisterDTO {
  @IsEmail()
  email: string;
}
