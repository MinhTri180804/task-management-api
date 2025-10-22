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
export class JwtInitProfileTokenFactory implements JwtOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const { initProfileToken } =
      this._configService.getOrThrow<SecretKeyConfig>(SecretKeyConfigName);

    const { initProfileToken: expiresInInitProfileToken } =
      this._configService.getOrThrow<ExpiresInConfig>(ExpiresInConfigName);

    return {
      secret: initProfileToken,
      signOptions: { expiresIn: expiresInInitProfileToken as JwtExpiresIn },
    };
  }
}
