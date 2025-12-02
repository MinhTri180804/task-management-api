import { CACHE_BLACKLIST_KEY_PREFIX } from '@core/cache/cache.constant';
import { CacheService } from '@core/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { BaseServiceCacheAbstract } from 'src/core/base/cache/cache.service.base.abstract';
import { IBaseServiceCache } from 'src/core/base/cache/cache.service.base.interface';
import {
  DeleteParams,
  GetKeyParams,
  GetParams,
  GetReturn,
  Payload,
  SaveParams,
  SaveReturn,
} from './set-password-token.type';

export type ISetPasswordTokenCacheWhiteListService = IBaseServiceCache<
  GetKeyParams,
  GetParams,
  SaveParams,
  DeleteParams,
  GetReturn,
  SaveReturn
>;

@Injectable()
export class SetPasswordTokenCacheWhiteListService
  extends BaseServiceCacheAbstract<
    GetKeyParams,
    GetParams,
    SaveParams,
    DeleteParams,
    GetReturn,
    SaveReturn
  >
  implements ISetPasswordTokenCacheWhiteListService
{
  private _cacheKeyName = 'set_password';

  constructor(protected readonly _cacheService: CacheService) {
    super(_cacheService);
  }

  getKey({ userId }: GetKeyParams): string {
    return `${CACHE_BLACKLIST_KEY_PREFIX}:${this._cacheKeyName}:${userId}`;
  }

  async set({ userId, token }: SaveParams): Promise<SaveReturn> {
    const KEY = this.getKey({ userId });
    const payload: Payload = { token };
    const ttlSecond = 60 * 60;
    const TTL = ttlSecond * 1000;
    await this._cacheService.set(KEY, payload, TTL);
    return { expiresAt: Date.now() + TTL };
  }

  async get({ userId }: GetParams): Promise<GetReturn> {
    const KEY = this.getKey({ userId });
    return await this._cacheService.get<GetReturn>(KEY);
  }

  async del({ userId }: DeleteParams): Promise<boolean> {
    const KEY = this.getKey({ userId });
    return await this._cacheService.del(KEY);
  }
}
