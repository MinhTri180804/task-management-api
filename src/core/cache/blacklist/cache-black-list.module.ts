import { Module } from '@nestjs/common';
import { CacheModule } from '../cache.module';
import { CacheBlacklistService } from './cache-black-list.service';

@Module({
  imports: [CacheModule],
  providers: [CacheBlacklistService],
  exports: [CacheBlacklistService],
})
export class CacheBlacklistModule {}
