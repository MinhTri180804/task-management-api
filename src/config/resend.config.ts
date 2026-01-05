import { registerAs } from '@nestjs/config';

export const ResendConfigName = 'resend';

export interface ResendConfig {
  apiKey: string;
  emailFrom: string;
  verifyEmailRegister: number;
}

export default registerAs(
  ResendConfigName,
  (): ResendConfig => ({
    apiKey: process.env.RESEND_API_KEY!,
    emailFrom: process.env.RESEND_EMAIL_FROM!,
    verifyEmailRegister: Number(
      process.env.RESEND_VERIFY_EMAIL_REGISTER_SECOND!,
    ),
  }),
);
