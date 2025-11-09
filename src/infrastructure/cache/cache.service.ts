import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ICacheManager } from './interfaces/cache-manager.interface';

@Injectable()
export class CacheService implements ICacheManager {
  constructor(@Inject(CACHE_MANAGER) protected readonly _cacheManager: Cache) {}

  async get<T>(key: string) {
    return await this._cacheManager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number) {
    await this._cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<boolean> {
    return await this._cacheManager.del(key);
  }
}
