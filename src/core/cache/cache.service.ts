import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_VERIFY_EMAIL_REGISTER_KEY } from './cache.constant';
import { VerifyEmailRegisterPayload } from './cache.type';

// ====== Types Params ======
type SaveVerifyEmailRegisterParams = {
  email: string;
  otp: string;
};

type GetVerifyEmailRegisterParams = { email: string };

type DeleteVerifyEmailRegisterParams = { email: string };

// ====== Types Return ======
type SaveVerifyEmailRegisterReturn = {
  expiredAt: Date;
};

type GetVerifyEmailRegisterReturn = VerifyEmailRegisterPayload;

type DeleteVerifyEmailRegisterReturn = Promise<boolean>;

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  private _getKeyVerifyEmailRegister({ email }: { email: string }) {
    return `${CACHE_VERIFY_EMAIL_REGISTER_KEY}:${email}`;
  }

  async getVerifyEmailRegister({
    email,
  }: GetVerifyEmailRegisterParams): Promise<
    GetVerifyEmailRegisterReturn | undefined
  > {
    const KEY = this._getKeyVerifyEmailRegister({ email });
    return await this._cacheManager.get(KEY);
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

    await this._cacheManager.set<VerifyEmailRegisterPayload>(
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
    return await this._cacheManager.del(KEY);
  }
}
