export type VerifyEmailRegisterParams = {
  email: string;
  otp: string;
  expiredAt: Date;
};

export type VerifyEmailRegisterData = VerifyEmailRegisterParams;
