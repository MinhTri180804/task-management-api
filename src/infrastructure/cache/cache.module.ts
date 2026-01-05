import { CacheModule as CacheModuleNestJs } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheModuleFactory } from './cache.factory';
import { Global, Module } from '@nestjs/common';
import { CacheManagerService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModuleNestJs.registerAsync({
      inject: [ConfigService],
      useClass: CacheModuleFactory,
    }),
  ],
  providers: [CacheManagerService],
  exports: [CacheManagerService, CacheModuleNestJs],
})
export class CacheModule {}
