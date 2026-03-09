import { registerAs } from '@nestjs/config';

export const ExpiresInConfigName = 'expires_in_config';

export interface ExpiresInConfig {
  accessToken: string;
  refreshToken: number;
  initProfileToken: string;
  setPasswordToken: string;
  forgotPasswordToken: string;
  verifyEmailRegisterSecond: number;
}

export default registerAs(
  ExpiresInConfigName,
  (): ExpiresInConfig => ({
    accessToken: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshToken: Number(process.env.JWT_REFRESH_EXPIRES_IN!),
    initProfileToken: process.env.JWT_INIT_PROFILE_EXPIRES_IN!,
    setPasswordToken: process.env.JWT_SET_PASSWORD_EXPIRES_IN!,
    forgotPasswordToken: process.env.JWT_FORGOT_PASSWORD_EXPIRES_IN!,
    verifyEmailRegisterSecond: Number(
      process.env.VERIFY_EMAIL_REGISTER_EXPIRES_SECOND!,
    ),
  }),
);
