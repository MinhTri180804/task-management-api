import { ResendConfig, ResendConfigName } from '@config/resend.config';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateEmailResponseSuccess, ErrorResponse, Resend } from 'resend';
import verifyEmailRegisterTemplate from './templates/verify-email-register.template';

type SendVerifyEmailRegisterParams = {
  email: string;
  otp: string;
  expiredAt: Date;
};

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);
  private readonly _resend: Resend;
  private readonly _emailForm: string;

  constructor(private readonly _configService: ConfigService) {
    const { apiKey, emailFrom } =
      _configService.getOrThrow<ResendConfig>(ResendConfigName);

    this._resend = new Resend(apiKey);
    this._emailForm = emailFrom;
  }

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
    const { data, error } = await this._resend.emails.send({
      from: this._emailForm,
      to: emailTo,
      subject: '🎉 Welcome to Task Manager!',
      html: '<p>Congrats on sending',
    });

    this._trackingLog(data, error);
  }

  async sendVerifyEmailRegister({
    email,
    expiredAt,
    otp,
  }: SendVerifyEmailRegisterParams) {
    const { data, error } = await this._resend.emails.send({
      from: this._emailForm,
      to: email,
      subject: 'Verify email register',
      html: verifyEmailRegisterTemplate({ otp, expiredAt }),
    });

    this._trackingLog(data, error);
  }
}
