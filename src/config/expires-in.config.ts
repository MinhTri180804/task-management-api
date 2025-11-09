import { registerAs } from '@nestjs/config';

export const ExpiresInConfigName = 'expires_in_config';

export interface ExpiresInConfig {
  accessToken: string;
  refreshToken: string;
  initProfileToken: string;
  setPasswordToken: string;
}

export default registerAs(
  ExpiresInConfigName,
  (): ExpiresInConfig => ({
    accessToken: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshToken: process.env.JWT_REFRESH_EXPIRES_IN!,
    initProfileToken: process.env.JWT_INIT_PROFILE_EXPIRES_IN!,
    setPasswordToken: process.env.JWT_SET_PASSWORD_EXPIRES_IN!,
  }),
);
