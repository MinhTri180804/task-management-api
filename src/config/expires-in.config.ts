import { registerAs } from '@nestjs/config';

export const ExpiresInConfigName = 'expires_in_config';

export interface ExpiresInConfig {
  accessToken: string;
  refreshToken: string;
  initProfileToken: string;
  resetPasswordToken: string;
}

export default registerAs(
  ExpiresInConfigName,
  (): ExpiresInConfig => ({
    accessToken: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshToken: process.env.JWT_REFRESH_EXPIRES_IN!,
    initProfileToken: process.env.JWT_INIT_PROFILE_EXPIRES_IN!,
    resetPasswordToken: process.env.JWT_RESET_PASSWORD_EXPIRES_IN!,
  }),
);
