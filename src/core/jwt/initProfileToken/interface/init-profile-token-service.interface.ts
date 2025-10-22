import { IBaseServiceJwt } from '@shared/jwt/base/jwt.service.base.interface';
import { JwtInitProfileTokenPayload } from '../type/payload.type';

export type SignParams = { email: string; userId: string };

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJwtInitProfileTokenService
  extends IBaseServiceJwt<JwtInitProfileTokenPayload, SignParams> {}
