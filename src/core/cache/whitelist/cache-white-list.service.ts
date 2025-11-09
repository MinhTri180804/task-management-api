import { Injectable } from '@nestjs/common';
import { CACHE_VERIFY_EMAIL_REGISTER_KEY } from '../cache.constant';
import { CacheService } from '../cache.service';
import { VerifyEmailRegisterPayload } from './types/cache-payload.type';
import {
  DeleteVerifyEmailRegisterParams,
  GetVerifyEmailRegisterParams,
  SaveVerifyEmailRegisterParams,
} from './types/method-services-params.type';
import {
  DeleteVerifyEmailRegisterReturn,
  GetVerifyEmailRegisterReturn,
  SaveVerifyEmailRegisterReturn,
} from './types/method-services-return.type';

@Injectable()
export class CacheWhiteListService {
  constructor(private readonly _cacheService: CacheService) {}

  private _getKeyVerifyEmailRegister({ email }: { email: string }) {
    return `${CACHE_VERIFY_EMAIL_REGISTER_KEY}:${email}`;
  }

  async getVerifyEmailRegister({
    email,
  }: GetVerifyEmailRegisterParams): Promise<
    GetVerifyEmailRegisterReturn | undefined
  > {
    const KEY = this._getKeyVerifyEmailRegister({ email });
    return await this._cacheService.get<VerifyEmailRegisterPayload>(KEY);
  }

  async saveVerifyEmailRegister({
    email,
    otp,
  }: SaveVerifyEmailRegisterParams): Promise<SaveVerifyEmailRegisterReturn> {
    const TTL_MINUTE = 3;
    const KEY = this._getKeyVerifyEmailRegister({ email });
    const TTL = TTL_MINUTE * 60;

    const createdAt = Date.now();
    const expiredAt = new Date(createdAt + TTL * 1000);

    const PAYLOAD: VerifyEmailRegisterPayload = { otp, createdAt };

    await this._cacheService.set<VerifyEmailRegisterPayload>(
      KEY,
      PAYLOAD,
      TTL * 1000,
    );

    return { expiredAt };
  }

  async deleteVerifyEmailRegister({
    email,
  }: DeleteVerifyEmailRegisterParams): DeleteVerifyEmailRegisterReturn {
    const KEY = this._getKeyVerifyEmailRegister({ email });
    return await this._cacheService.del(KEY);
  }
}
