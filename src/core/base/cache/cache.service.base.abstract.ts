import { ICacheManager } from 'src/core/base/cache/cache-manager.interface';
import { IBaseServiceCache } from './cache.service.base.interface';

export abstract class BaseServiceCacheAbstract<T, J, K, L, M, N>
  implements IBaseServiceCache<T, J, K, L, M, N>
{
  protected readonly _whitelistKeyPrefix = 'whitelist';
  protected readonly _blacklistKeyPrefix = 'blacklist';

  constructor(
    protected readonly _cacheService: ICacheManager,
    protected readonly _prefix: string,
  ) {}

  abstract getKey(params: T): string;

  abstract get(params: J): Promise<M | undefined>;

  abstract set(params: K): Promise<N>;

  abstract del(params: L): Promise<boolean>;
}
