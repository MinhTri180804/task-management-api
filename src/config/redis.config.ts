import { registerAs } from '@nestjs/config';

export const RedisConfigName = 'redis';

export interface RedisConfig {
  host: string;
  port: string;
}

export default registerAs(
  RedisConfigName,
  (): RedisConfig => ({
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!,
  }),
);
