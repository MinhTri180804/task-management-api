import { registerAs } from '@nestjs/config';

export const NodemailerConfigName = 'nodemailer_config';

export interface NodemailerConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export default registerAs(
  NodemailerConfigName,
  (): NodemailerConfig => ({
    host: process.env.NODEMAILER_HOST!,
    port: Number(process.env.NODEMAILER_PORT!),
    username: process.env.NODEMAILER_USERNAME!,
    password: process.env.NODEMAILER_PASSWORD!,
  }),
);
