import { registerAs } from '@nestjs/config';

export const DatabaseConfigName = 'database';

export interface DatabaseConfig {
  name: string;
  port: string;
  host: string;
}

export default registerAs(
  DatabaseConfigName,
  (): DatabaseConfig => ({
    name: process.env.DB_NAME!,
    port: process.env.DB_PORT!,
    host: process.env.DB_HOST!,
  }),
);
