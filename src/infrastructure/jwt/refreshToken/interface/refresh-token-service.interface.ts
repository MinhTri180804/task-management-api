import { IBaseServiceJwt } from 'src/core/base/jwt/jwt.service.base.interface';
import { JWTRefreshTokenPayload } from '../types/payload.type';

export type SignParams = {
  deviceId: string;
  userId: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJwtRefreshTokenService
  extends IBaseServiceJwt<JWTRefreshTokenPayload, SignParams> {}
