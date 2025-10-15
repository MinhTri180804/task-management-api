import appConfig from '@config/app.config';
import databaseConfig from '@config/database.config';
import { validateEnv } from '@config/env-validation.config';
import { getEnvFilePath } from 'src/utils/getEnvFilePath.config';
import { ConfigModule as ConfigModuleNestJS } from '@nestjs/config';
import redisConfig from '@config/redis.config';

export const ConfigModule = ConfigModuleNestJS.forRoot({
  isGlobal: true,
  envFilePath: getEnvFilePath(),
  cache: true,
  load: [databaseConfig, appConfig, redisConfig],
  validate: validateEnv,
});

// @Module
// export class ConfigModule {}
