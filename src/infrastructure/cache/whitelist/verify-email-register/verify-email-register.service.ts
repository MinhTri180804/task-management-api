import { Injectable } from '@nestjs/common';
import { BaseServiceCacheAbstract } from 'src/core/base/cache/cache.service.base.abstract';
import {
  DeleteParams,
  GetKeyParams,
  GetParams,
  GetReturn,
  Payload,
  SaveParams,
  SaveReturn,
} from './verify-email-register.type';
import { IBaseServiceCache } from 'src/core/base/cache/cache.service.base.interface';
import { CACHE_WHITELIST_KEY_PREFIX } from '@core/cache/cache.constant';
import { CacheService } from '@core/cache/cache.service';

export type IVerifyEmailRegisterCacheWhiteListService = IBaseServiceCache<
  GetKeyParams,
  GetParams,
  SaveParams,
  DeleteParams,
  GetReturn,
  SaveReturn
>;

@Injectable()
export class VerifyEmailRegisterCacheWhiteListService
  extends BaseServiceCacheAbstract<
    GetKeyParams,
    GetParams,
    SaveParams,
    DeleteParams,
    GetReturn,
    SaveReturn
  >
  implements IVerifyEmailRegisterCacheWhiteListService
{
  private _cacheKey = 'verify_email_register';

  constructor(protected readonly _cacheService: CacheService) {
    super(_cacheService);
  }

  getKey({ email }: GetKeyParams): string {
    return `${CACHE_WHITELIST_KEY_PREFIX}:${this._cacheKey}:${email}`;
  }

  async get({ email }: GetParams): Promise<GetReturn | undefined> {
    const KEY = this.getKey({ email });
    return await this._cacheService.get(KEY);
  }

  async set({ email, otp }: SaveParams): Promise<SaveReturn> {
    const TTL_MINUTE = 3;
    const KEY = this.getKey({ email });
    const TTL = TTL_MINUTE * 60;

    const createdAt = Date.now();
    const expiredAt = new Date(createdAt + TTL * 1000);

    const PAYLOAD: Payload = { otp, createdAt };

    await this._cacheService.set<Payload>(KEY, PAYLOAD, TTL * 1000);

    return { expiredAt };
  }

  async del({ email }: DeleteParams): Promise<boolean> {
    const KEY = this.getKey({ email });
    return await this._cacheService.del(KEY);
  }
}
