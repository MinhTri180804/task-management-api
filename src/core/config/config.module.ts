import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import { validateEnv } from '@config/env-validation.config';
import { getEnvFilePath } from 'src/utils/getEnvFilePath.util';
import { ConfigModule as ConfigModuleNestJS } from '@nestjs/config';
import redisConfig from '@config/redis.config';
import { Module } from '@nestjs/common';
import resendConfig from '@config/resend.config';

@Module({
  imports: [
    ConfigModuleNestJS.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      cache: true,
      load: [databaseConfig, appConfig, redisConfig, resendConfig],
      validate: validateEnv,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigModule {}
