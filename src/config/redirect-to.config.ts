import { registerAs } from '@nestjs/config';

export const RedirectToConfigName = 'redirect_to_config';

export interface RedirectToConfig {
  createProfile: string;
}

export default registerAs(
  RedirectToConfigName,
  (): RedirectToConfig => ({
    createProfile: process.env.CREATE_PROFILE_REDIRECT_TO!,
  }),
);
