import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateEmailResponseSuccess, ErrorResponse } from 'resend';
import { type MailerPort } from './mailer.port';
import * as MailToken from './mail.token';

type SendVerifyEmailRegisterParams = {
  email: string;
  otp: string;
  expiredAt: Date;
};

type SendVerifiedEmailRegisterSuccessfully = {
  email: string;
  setPasswordToken: string;
  expiresAt: number;
};

type ForgotPasswordParams = {
  email: string;
  token: string;
  expiresAt: number;
};

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);

  constructor(
    @Inject(MailToken.MAILER_PORT_TOKEN) private readonly _mailer: MailerPort,
  ) {}

  private _trackingLog(
    data: CreateEmailResponseSuccess | null,
    error: ErrorResponse | null,
  ) {
    if (error) {
      this._logger.error(`Send mail failed: ${error.message}`);
    } else {
      this._logger.log(`Mail sent successfully: ${data?.id}`);
    }
  }

  async sendWelcomeEmail(emailTo: string) {
    await this._mailer.sendWelcome({ emailTo });
    return;
  }

  async sendVerifyEmailRegister({
    email,
    expiredAt,
    otp,
  }: SendVerifyEmailRegisterParams) {
    await this._mailer.sendVerifyEmailRegister({ email, expiredAt, otp });
    return;
  }

  async sendVerifiedEmailRegisterSuccessfully({
    email,
    setPasswordToken,
    expiresAt,
  }: SendVerifiedEmailRegisterSuccessfully) {
    await this._mailer.sendVerifiedEmailRegisterSuccessfully({
      email,
      setPasswordToken,
      expiresAt,
    });
    return;
  }

  async sendForgotPassword({ email, token, expiresAt }: ForgotPasswordParams) {
    await this._mailer.sendForgotPassword({ email, token, expiresAt });
    return;
  }
}
