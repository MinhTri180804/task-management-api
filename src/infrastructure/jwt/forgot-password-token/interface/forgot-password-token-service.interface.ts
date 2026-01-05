import { IBaseServiceJwt } from 'src/core/base/jwt/jwt.service.base.interface';
import { JwtForgotPasswordTokenPayload } from '../types/payload.type';

export type SignParams = {
  email: string;
  userId: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJwtForgotPasswordTokenService
  extends IBaseServiceJwt<JwtForgotPasswordTokenPayload, SignParams> {}
