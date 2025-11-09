import { Module } from '@nestjs/common';
import { CacheModule } from '../cache.module';
import { CacheWhiteListService } from './cache-white-list.service';

@Module({
  imports: [CacheModule],
  providers: [CacheWhiteListService],
  exports: [CacheWhiteListService],
})
export class CacheWhiteListModule {}
