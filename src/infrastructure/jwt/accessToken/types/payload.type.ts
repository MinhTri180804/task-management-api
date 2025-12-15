import { AuthMethodEnum } from '@enum/auth-method.enum';

export type JWTAccessTokenPayload = {
  email: string;
  deviceId: string;
  isEmailVerified: boolean;
  localAuthEnabled: boolean;
  primaryAuthMethod: AuthMethodEnum;
  createdAt: string;
  updatedAt: string;
  sub: string;
  exp: number;
  iat: number;
};
