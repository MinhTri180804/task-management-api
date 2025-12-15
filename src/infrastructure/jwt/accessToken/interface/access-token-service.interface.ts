import { IBaseServiceJwt } from 'src/core/base/jwt/jwt.service.base.interface';
import { JWTAccessTokenPayload } from '../types/payload.type';
import { AuthMethodEnum } from '@enum/auth-method.enum';

export type SignParams = {
  userId: string;
  email: string;
  deviceId: string;
  isEmailVerified: boolean;
  localAuthEnabled: boolean;
  primaryAuthMethod: AuthMethodEnum;
  createdAt: string;
  updatedAt: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJwtAccessTokenService
  extends IBaseServiceJwt<JWTAccessTokenPayload, SignParams> {}
