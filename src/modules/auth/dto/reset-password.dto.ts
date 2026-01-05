import { IsMatch } from '@shared/decorators/is-match.decorator';
import { IsPasswordPattern } from '@shared/decorators/is-password-pattern.decorator';
import { IsJWT, IsString } from 'class-validator';

export class ResetPasswordDTO {
  @IsJWT()
  resetPasswordToken: string;

  @IsString()
  @IsPasswordPattern()
  newPassword: string;

  @IsString()
  @IsPasswordPattern()
  @IsMatch('newPassword', {
    message: 'Password confirm do not match with password',
  })
  newPasswordConfirm: string;
}
