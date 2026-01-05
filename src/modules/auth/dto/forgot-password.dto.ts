import { Trim } from '@shared/decorators/trim.decorator';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail()
  @Trim()
  email: string;
}
