import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import { validateEnv } from '@config/env-validation.config';
import { getEnvFilePath } from '@shared/utils/getEnvFilePath.util';
import { ConfigModule as ConfigModuleNestJS } from '@nestjs/config';
import redisConfig from '@config/redis.config';
import { Module } from '@nestjs/common';
import resendConfig from '@config/resend.config';
import expiresInConfig from '@config/expires-in.config';
import secretKeyConfig from '@config/secret-key.config';
import redirectToConfig from '@config/redirect-to.config';

@Module({
  imports: [
    ConfigModuleNestJS.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      cache: true,
      load: [
        databaseConfig,
        appConfig,
        redisConfig,
        resendConfig,
        expiresInConfig,
        secretKeyConfig,
        redirectToConfig,
      ],
      validate: validateEnv,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigModule {}
