export type VerifyEmailRegisterParams = {
  email: string;
  otp: string;
  expiredAt: Date;
};

export type VerifyEmailRegisterData = VerifyEmailRegisterParams;

export type VerifiedEmailRegisterSuccessfullyParams = {
  email: string;
};

export type VerifiedEmailRegisterSuccessfullyData =
  VerifiedEmailRegisterSuccessfullyParams;
