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
  @Trim()
  password: string;
}
