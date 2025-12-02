import { ICacheManager } from '@core/cache/interfaces/cache-manager.interface';
import { IBaseServiceCache } from './cache.service.base.interface';

export abstract class BaseServiceCacheAbstract<T, J, K, L, M, N>
  implements IBaseServiceCache<T, J, K, L, M, N>
{
  constructor(protected readonly _cacheService: ICacheManager) {}

  abstract getKey(params: T): string;

  abstract get(params: J): Promise<M | undefined>;

  abstract set(params: K): Promise<N>;

  abstract del(params: L): Promise<boolean>;
}
