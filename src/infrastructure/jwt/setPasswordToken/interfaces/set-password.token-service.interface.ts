import { IBaseServiceJwt } from 'src/core/base/jwt/jwt.service.base.interface';
import { JwtSetPasswordTokenPayload } from '../types/payload.type';

export type SignParams = {
  userId: string;
  email: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJwtSetPasswordTokenService
  extends IBaseServiceJwt<JwtSetPasswordTokenPayload, SignParams> {}
