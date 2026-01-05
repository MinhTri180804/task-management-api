import { CacheManagerService } from '@core/cache/cache.service';
import { IBaseJsonWebTokenCache } from './base-jwt-token-cache.interface';

export abstract class BaseJsonWebTokenCacheAbstract
  implements IBaseJsonWebTokenCache
{
  constructor(
    protected readonly _cacheManagerService: CacheManagerService,
    protected readonly prefix: string,
    // ttl in seconds
    protected readonly fixedTTL: number | null,
  ) {}

  protected getKeyWL(tokenId: string) {
    return `whitelist:${this.prefix}:${tokenId}`;
  }

  protected getKeyBL(tokenId: string) {
    return `blacklist:${this.prefix}:${tokenId}`;
  }

  async set({
    tokenId,
    // ttl in seconds, if null uses fixedTTL
    ttl = this.fixedTTL,
  }: {
    tokenId: string;
    ttl: number | null;
  }): Promise<void> {
    const whitelistKey = this.getKeyWL(tokenId);

    if (ttl === null) {
      await this._cacheManagerService.set(whitelistKey, 1);
      return;
    }

    const ttlMilliseconds = ttl * 1000;

    await this._cacheManagerService.set(whitelistKey, 1, ttlMilliseconds);
    return;
  }

  async exist({ tokenId }: { tokenId: string }): Promise<boolean> {
    const blacklistKey = this.getKeyBL(tokenId);
    const isExistInBlacklist =
      await this._cacheManagerService.get(blacklistKey);

    if (isExistInBlacklist) return false;

    const whitelistKey = this.getKeyWL(tokenId);
    const isExistInWhitelist =
      await this._cacheManagerService.get(whitelistKey);

    return !!isExistInWhitelist;
  }

  async revoke({ tokenId }: { tokenId: string }): Promise<void> {
    const whitelistKey = this.getKeyWL(tokenId);

    const ttlRemaining = await this._cacheManagerService.getTtl(whitelistKey);
    if (ttlRemaining && ttlRemaining > 0) {
      const blacklistKey = this.getKeyBL(tokenId);

      await this._cacheManagerService.set(blacklistKey, 1, ttlRemaining);
    }

    await this._cacheManagerService.del(whitelistKey);
  }
}
