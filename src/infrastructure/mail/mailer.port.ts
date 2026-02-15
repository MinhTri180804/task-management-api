export interface MailerPort {
  sendWelcome({ emailTo }: { emailTo: string }): Promise<void>;

  sendVerifyEmailRegister({
    email,
    expiredAt,
    otp,
  }: {
    email: string;
    expiredAt: Date;
    otp: string;
  }): Promise<void>;

  sendVerifiedEmailRegisterSuccessfully({
    email,
    setPasswordToken,
    expiresAt,
  }: {
    email: string;
    setPasswordToken: string;
    expiresAt: number;
  }): Promise<void>;

  sendForgotPassword({
    email,
    token,
    expiresAt,
  }: {
    email: string;
    token: string;
    expiresAt: number;
  }): Promise<void>;
}
