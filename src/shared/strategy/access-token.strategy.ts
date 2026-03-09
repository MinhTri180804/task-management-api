import {
  SecretKeyConfig,
  SecretKeyConfigName,
} from '@config/secret-key.config';
import { JWTAccessTokenPayload } from '@infrastructure/jwt/accessToken/types/payload.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _configService: ConfigService) {
    const { accessToken } =
      _configService.getOrThrow<SecretKeyConfig>(SecretKeyConfigName);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessToken,
    });
  }

  validate(payload: JWTAccessTokenPayload): JWTAccessTokenPayload {
    return payload;
  }
}
