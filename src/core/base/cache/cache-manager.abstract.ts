import { Cache } from '@nestjs/cache-manager';

export abstract class CacheManagerAbstract {
  constructor(protected readonly _cacheManager: Cache) {}

  async get<T>(key: string) {
    return await this._cacheManager.get<T | undefined>(key);
  }

  async set<T>(key: string, value: T, ttl?: number) {
    await this._cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<boolean> {
    return await this._cacheManager.del(key);
  }

  async getTtl(key: string): Promise<number | undefined> {
    return await this._cacheManager.ttl(key);
  }
}
