export type VerifyEmailRegisterParams = {
  email: string;
  otp: string;
  expiredAt: Date;
};

export type VerifyEmailRegisterData = VerifyEmailRegisterParams;

export type VerifiedEmailRegisterSuccessfullyParams = {
  email: string;
  setPasswordToken: string;
  expiresAt: number;
};

export type VerifiedEmailRegisterSuccessfullyData =
  VerifiedEmailRegisterSuccessfullyParams;

export type ForgotPasswordParams = {
  email: string;
  forgotPasswordToken: string;
  expiresAt: number;
};

export type ForgotPasswordData = ForgotPasswordParams;
