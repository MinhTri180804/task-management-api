import { registerAs } from '@nestjs/config';

export const RedisConfigName = 'redis';

export interface RedisConfig {
  host: string;
  port: number;
}

export default registerAs(
  RedisConfigName,
  (): RedisConfig => ({
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
  }),
);
