import { registerAs } from '@nestjs/config';

export const SecretKeyConfigName = 'secret_key_config';

export interface SecretKeyConfig {
  accessToken: string;
  refreshToken: string;
  initProfileToken: string;
  setPasswordToken: string;
}

export default registerAs(
  SecretKeyConfigName,
  (): SecretKeyConfig => ({
    accessToken: process.env.JWT_ACCESS_SECRET!,
    refreshToken: process.env.JWT_REFRESH_SECRET!,
    initProfileToken: process.env.JWT_INIT_PROFILE_SECRET!,
    setPasswordToken: process.env.JWT_SET_PASSWORD_SECRET!,
  }),
);
