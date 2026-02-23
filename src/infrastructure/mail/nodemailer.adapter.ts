import { ConfigService } from '@nestjs/config';
import { MailerPort } from './mailer.port';
import * as nodemailer from 'nodemailer';
import {
  NodemailerConfig,
  NodemailerConfigName,
} from '@config/nodemailer.config';
import forgotPasswordTemplate from './templates/forgot-password.template';
import verifyEmailRegisterTemplate from './templates/verify-email-register.template';
import sendVerifyEmailRegisterSuccessfullyTemplate from './templates/send-verify-email-register-successfully.template';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerAdapter implements MailerPort {
  readonly emailForm: string = "Libe' Team <libe.hcm@gmail.com>";
  readonly transporter: nodemailer.Transporter;

  constructor(private readonly _configService: ConfigService) {
    const { host, port, username, password } =
      _configService.getOrThrow<NodemailerConfig>(NodemailerConfigName);
    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: {
        user: username,
        pass: password,
      },
    });
  }

  async sendWelcome({ emailTo }: { emailTo: string }): Promise<void> {
    await this.transporter.sendMail({
      from: this.emailForm,
      to: emailTo,
      subject: 'Welcome',
      html: '<p>Welcome to our service</p>',
    });
  }

  async sendVerifyEmailRegister({
    email,
    expiredAt,
    otp,
  }: {
    email: string;
    expiredAt: Date;
    otp: string;
  }): Promise<void> {
    await this.transporter.sendMail({
      from: this.emailForm,
      to: email,
      subject: 'Verify Email Register',
      html: verifyEmailRegisterTemplate({ otp, expiredAt }),
    });
  }

  async sendVerifiedEmailRegisterSuccessfully({
    email,
    setPasswordToken,
    expiresAt,
  }: {
    email: string;
    setPasswordToken: string;
    expiresAt: number;
  }): Promise<void> {
    await this.transporter.sendMail({
      from: this.emailForm,
      to: email,
      subject: 'Verified Email Register Successfully',
      html: sendVerifyEmailRegisterSuccessfullyTemplate({
        setPasswordToken,
        email,
        expiresAt,
      }),
    });
  }

  async sendForgotPassword({
    email,
    token,
    expiresAt,
  }: {
    email: string;
    token: string;
    expiresAt: number;
  }): Promise<void> {
    await this.transporter.sendMail({
      from: this.emailForm,
      to: email,
      subject: 'Forgot Password',
      html: forgotPasswordTemplate({ token, expiresAt }),
    });
  }
}
