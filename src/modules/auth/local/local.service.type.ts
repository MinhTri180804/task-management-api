import { User } from '@modules/user/entity/user.entity';

// Type Params
export type SendOTPVerifyRegisterParams = { email: string };

export type ResendOTPVerifyRegisterParams = { email: string };

export type VerifyOTPEmailRegisterParams = {
  email: string;
  otp: string;
};

export type SetPasswordParams = {
  password: string;
  passwordConfirm: string;
  setPasswordToken: string;
};

export type ValidateParams = {
  email: string;
  password: string;
};

export type LoginParams = {
  user: Omit<User, 'password'>;
  deviceId: string;
};

// Type Return
export type LoginReturn = {
  accessToken: string;
  refreshToken: string;
};

export type SetPasswordReturn = void;

export type SendOTPVerifyRegisterReturn = void;

export type ResendOTPVerifyRegisterReturn = void;

export type VerifyOTPEmailRegisterReturn = {
  userId: string;
  setPasswordToken: string;
};

export type ValidateReturn = Omit<User, 'password'> | null;
