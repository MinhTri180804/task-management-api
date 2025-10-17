import { ResendConfig, ResendConfigName } from '@config/resend.config';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

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

  async sendWelcomeEmail(emailTo: string) {
    const { data, error } = await this._resend.emails.send({
      from: this._emailForm,
      to: emailTo,
      subject: '🎉 Welcome to Task Manager!',
      html: '<p>Congrats on sending',
    });

    if (error) {
      this._logger.error(`Send mail failed: ${error.message}`);
    } else {
      this._logger.log(`Mail sent successfully: ${data?.id}`);
    }
  }
}
