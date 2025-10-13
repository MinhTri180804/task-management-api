import { registerAs } from '@nestjs/config';

export const AppConfigName = 'app';

export interface AppConfig {
  port: string;
  nodeEnv: string;
}

export default registerAs(
  AppConfigName,
  (): AppConfig => ({
    port: process.env.APP_PORT!,
    nodeEnv: process.env.NODE_ENV!,
  }),
);
