import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ICacheManager } from '../../core/base/cache/cache-manager.interface';
import { CacheManagerAbstract } from 'src/core/base/cache/cache-manager.abstract';

@Injectable()
export class CacheManagerService
  extends CacheManagerAbstract
  implements ICacheManager
{
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {
    super(_cacheManager);
  }
}
