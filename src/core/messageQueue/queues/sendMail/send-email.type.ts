export type VerifyEmailRegisterParams = {
  email: string;
  otp: string;
  expiredAt: Date;
};

export type VerifyEmailRegisterData = VerifyEmailRegisterParams;

export type CreateProfileRegisterParams = {
  email: string;
  expiresIn: number;
  token: string;
};

export type CreateProfileRegisterData = CreateProfileRegisterParams;
