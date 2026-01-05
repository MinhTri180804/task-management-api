import { ResendConfig, ResendConfigName } from '@config/resend.config';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateEmailResponseSuccess, ErrorResponse, Resend } from 'resend';
import sendVerifyEmailRegisterSuccessfullyTemplate from './templates/send-verify-email-register-successfully.template';
import verifyEmailRegisterTemplate from './templates/verify-email-register.template';
import forgotPasswordTemplate from './templates/forgot-password.template';
import { emailNotVerifiedNoticeTemplate } from './templates/email-not-verified-notice.template';

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

type SendEmailNotVerifiedNoticeParams = { email: string };

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

  async sendVerifiedEmailRegisterSuccessfully({
    email,
    setPasswordToken,
    expiresAt,
  }: SendVerifiedEmailRegisterSuccessfully) {
    const { data, error } = await this._resend.emails.send({
      from: this._emailForm,
      to: email,
      subject: 'Register email successfully',
      html: sendVerifyEmailRegisterSuccessfullyTemplate({
        email,
        setPasswordToken,
        expiresAt,
      }),
    });

    this._trackingLog(data, error);
  }

  async sendForgotPassword({ email, token, expiresAt }: ForgotPasswordParams) {
    const { data, error } = await this._resend.emails.send({
      from: this._emailForm,
      to: email,
      subject: 'Forgot password',
      html: forgotPasswordTemplate({ token, expiresAt }),
    });

    this._trackingLog(data, error);
  }

  async sendEmailNotVerifiedNotice({
    email,
  }: SendEmailNotVerifiedNoticeParams) {
    const { data, error } = await this._resend.emails.send({
      from: this._emailForm,
      to: email,
      subject: 'Email Not Verified Notice',
      html: emailNotVerifiedNoticeTemplate(),
    });

    this._trackingLog(data, error);
  }
}
