import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache.service';
import {
  DeleteSetPasswordParams,
  getKeySetPasswordParams,
  GetSetPasswordParams,
  SaveSetPasswordParams,
} from './types/method-services-params.type';
import {
  DeleteSetPasswordReturn,
  GetSetPasswordReturn,
  SaveSetPasswordReturn,
} from './types/method-services-return.type';
import { CACHE_BLACKLIST_SET_PASSWORD_KEY } from '../cache.constant';
import { SetPasswordPayload } from './types/cache-payload.type';

@Injectable()
export class CacheBlacklistService {
  constructor(private readonly _cacheService: CacheService) {}

  private _getKeySetPassword({ email }: getKeySetPasswordParams) {
    return `${CACHE_BLACKLIST_SET_PASSWORD_KEY}:${email}`;
  }

  async getSetPassword({ email }: GetSetPasswordParams): GetSetPasswordReturn {
    const KEY = this._getKeySetPassword({ email });
    return await this._cacheService.get<SetPasswordPayload>(KEY);
  }

  async saveSetPassword({
    email,
    token,
  }: SaveSetPasswordParams): SaveSetPasswordReturn {
    const TTL_MINUTE = 5;
    const KEY = this._getKeySetPassword({ email });
    const PAYLOAD: SetPasswordPayload = { token };
    const TTL = TTL_MINUTE * 60 * 1000;
    await this._cacheService.set<SetPasswordPayload>(KEY, PAYLOAD, TTL);
    return;
  }

  async deleteSetPassword({
    email,
  }: DeleteSetPasswordParams): DeleteSetPasswordReturn {
    const KEY = this._getKeySetPassword({ email });
    return await this._cacheService.del(KEY);
  }
}
