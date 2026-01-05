import { IsPasswordPattern } from '@shared/decorators/is-password-pattern.decorator';
import { Trim } from '@shared/decorators/trim.decorator';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @Trim()
  deviceId: string;

  @IsEmail()
  @Trim()
  email: string;

  @IsString()
  @IsPasswordPattern()
  password: string;
}
