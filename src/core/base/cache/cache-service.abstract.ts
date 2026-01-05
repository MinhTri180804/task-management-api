import { ICacheManager } from './cache-manager.interface';
import { ICacheService } from './cache-service.interface';

export abstract class CacheServiceAbstract implements ICacheService {
  protected readonly _keyBL = 'blacklist';
  protected readonly _keyWL = 'whitelist';

  constructor(
    protected readonly _cacheManagerService: ICacheManager,
    protected readonly _servicePrefix: string,
  ) {}

  getKeyBL(prefix: string): string {
    return `${this._keyBL}:${this._servicePrefix}:${prefix}`;
  }

  getKeyWL(prefix: string): string {
    return `${this._keyWL}:${this._servicePrefix}:${prefix}`;
  }

  async set(prefix: string, ttl: number): Promise<void>;
  async set<T>(prefix: string, ttl: number, payload: T): Promise<T>;
  async set<T = number>(
    prefix: string,
    ttl: number,
    payload?: T,
  ): Promise<void | T> {
    const whitelistKey = this.getKeyWL(prefix);

    if (payload === undefined) {
      await this._cacheManagerService.set(whitelistKey, 1, ttl);
    }

    await this._cacheManagerService.set(whitelistKey, payload, ttl);
    return payload;
  }

  async onlySetBL(prefix: string, ttl: number): Promise<void>;
  async onlySetBL<T, K = T>(
    prefix: string,
    ttl: number,
    payload: T,
  ): Promise<K>;
  async onlySetBL<T, K = T>(
    prefix: string,
    ttl: number,
    payload?: T,
  ): Promise<void | K> {
    const blacklistKey = this.getKeyBL(prefix);

    if (payload === undefined) {
      await this._cacheManagerService.set(blacklistKey, 1, ttl);
      return;
    }

    await this._cacheManagerService.set(blacklistKey, payload, ttl);
    return payload as K;
  }

  async onlySetWL(prefix: string, ttl: number): Promise<void>;
  async onlySetWL<T, K = T>(
    prefix: string,
    ttl: number,
    payload: T,
  ): Promise<K>;
  async onlySetWL<T, K = T>(
    prefix: string,
    ttl: number,
    payload?: T,
  ): Promise<void | K> {
    const whitelistKey = this.getKeyWL(prefix);

    if (payload === undefined) {
      await this._cacheManagerService.set(whitelistKey, 1, ttl);
      return;
    }

    await this._cacheManagerService.set(whitelistKey, payload, ttl);
    return payload as K;
  }

  async existInBL(prefix: string): Promise<boolean> {
    const blacklistKey = this.getKeyBL(prefix);
    const isExist = await this._cacheManagerService.get(blacklistKey);
    return Boolean(isExist);
  }

  async exitsInWL(prefix: string): Promise<boolean> {
    const whitelistKey = this.getKeyWL(prefix);

    const isExist = await this._cacheManagerService.get(whitelistKey);
    return Boolean(isExist);
  }

  async exits(prefix: string): Promise<boolean> {
    const blacklistKey = this.getKeyBL(prefix);
    const isExistInBlacklist =
      await this._cacheManagerService.get(blacklistKey);

    if (isExistInBlacklist) return false;

    const whitelistKey = this.getKeyWL(prefix);
    const isExistInWhitelist =
      await this._cacheManagerService.get(whitelistKey);

    return Boolean(isExistInWhitelist);
  }

  async revoke(prefix: string): Promise<void> {
    const whitelistKey = this.getKeyWL(prefix);
    const ttl = await this._cacheManagerService.getTtl(whitelistKey);
    if (ttl && ttl > 0) {
      const blacklistKey = this.getKeyBL(prefix);
      await this._cacheManagerService.set(blacklistKey, 1, ttl);
    }
    await this._cacheManagerService.del(whitelistKey);
  }

  async onlyRevokeInBL(prefix: string): Promise<void> {
    const blacklistKey = this.getKeyBL(prefix);
    await this._cacheManagerService.del(blacklistKey);
  }

  async onlyRevokeInWL(prefix: string): Promise<void> {
    const whitelistKey = this.getKeyWL(prefix);
    await this._cacheManagerService.del(whitelistKey);
  }

  async onlyGetWL<T = undefined>(prefix: string): Promise<T> {
    const whitelistKey = this.getKeyWL(prefix);
    return (await this._cacheManagerService.get(whitelistKey)) as T;
  }

  async onlyGetBL<T = undefined>(prefix: string): Promise<T> {
    const blacklistKey = this.getKeyBL(prefix);
    return (await this._cacheManagerService.get(blacklistKey)) as T;
  }
}
