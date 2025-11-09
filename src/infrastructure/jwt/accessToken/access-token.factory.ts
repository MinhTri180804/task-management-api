import {
  ExpiresInConfig,
  ExpiresInConfigName,
} from '@config/expires-in.config';
import {
  SecretKeyConfig,
  SecretKeyConfigName,
} from '@config/secret-key.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { JwtExpiresIn } from '@type/expires-in-jwt.type';

@Injectable()
export class JwtAccessTokenFactory implements JwtOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}

  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const { accessToken } =
      this._configService.getOrThrow<SecretKeyConfig>(SecretKeyConfigName);

    const { accessToken: expiresInAccessToken } =
      this._configService.getOrThrow<ExpiresInConfig>(ExpiresInConfigName);

    return {
      secret: accessToken,
      signOptions: { expiresIn: expiresInAccessToken as JwtExpiresIn },
    };
  }
}
