import { Injectable } from '@nestjs/common';
import { BaseServiceJwtAbstract } from 'src/core/base/jwt/jwt.service.base.abstract';
import { JWTAccessTokenPayload } from './types/payload.type';
import {
  IJwtAccessTokenService,
  SignParams,
} from './interface/access-token-service.interface';
import { JwtService } from '@nestjs/jwt';

const INVALID_TOKEN_MESSAGE = 'AccessToken invalid';

@Injectable()
export class JWTAccessTokenService
  extends BaseServiceJwtAbstract<JWTAccessTokenPayload, SignParams>
  implements IJwtAccessTokenService
{
  constructor(protected readonly jwtService: JwtService) {
    super(jwtService, INVALID_TOKEN_MESSAGE);
  }

  sign(payload: SignParams): string {
    const jwtPayload: Omit<JWTAccessTokenPayload, 'exp' | 'iat'> = {
      sub: payload.userId,
      email: payload.email,
      deviceId: payload.deviceId,
      isEmailVerified: payload.isEmailVerified,
      localAuthEnabled: payload.localAuthEnabled,
      primaryAuthMethod: payload.primaryAuthMethod,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
    };

    return this.jwtService.sign(jwtPayload);
  }
}
