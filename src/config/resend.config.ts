import { registerAs } from '@nestjs/config';

export const ResendConfigName = 'resend';

export interface ResendConfig {
  apiKey: string;
  emailFrom: string;
}

export default registerAs(
  ResendConfigName,
  (): ResendConfig => ({
    apiKey: process.env.RESEND_API_KEY!,
    emailFrom: process.env.RESEND_EMAIL_FROM!,
  }),
);
