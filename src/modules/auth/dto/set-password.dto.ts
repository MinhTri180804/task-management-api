import { IsJWT, IsString } from 'class-validator';

export class SetPasswordDTO {
  @IsJWT()
  setPasswordToken: string;

  @IsString()
  password: string;

  // TODO: Add decorator transform and validate password confirm match with password
  @IsString()
  passwordConfirm: string;
}
