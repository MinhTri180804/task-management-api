import { Injectable } from '@nestjs/common';
import { BaseServiceJwtAbstract } from 'src/core/base/jwt/jwt.service.base.abstract';
import {
  IJwtRefreshTokenService,
  SignParams,
} from './interface/refresh-token-service.interface';
import { JWTRefreshTokenPayload } from './types/payload.type';
import { JwtService } from '@nestjs/jwt';

const INVALID_TOKEN_MESSAGE = 'RefreshToken invalid';

@Injectable()
export class JWTRefreshTokenService
  extends BaseServiceJwtAbstract<JWTRefreshTokenPayload, SignParams>
  implements IJwtRefreshTokenService
{
  constructor(protected readonly jwtService: JwtService) {
    super(jwtService, INVALID_TOKEN_MESSAGE);
  }
  sign({ userId, deviceId }: SignParams): string {
    const payload: Omit<JWTRefreshTokenPayload, 'exp' | 'iat'> = {
      deviceId,
      sub: userId,
    };
    return this.jwtService.sign(payload);
  }
}
