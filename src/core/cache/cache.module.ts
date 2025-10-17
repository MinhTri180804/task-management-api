import { CacheModule as CacheModuleNestJs } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheModuleFactory } from './cache.factory';

export const CacheModule = CacheModuleNestJs.registerAsync({
  inject: [ConfigService],
  useClass: CacheModuleFactory,
});
