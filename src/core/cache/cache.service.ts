import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_VERIFY_EMAIL_REGISTER_KEY } from './cache.constant';
import { VerifyEmailRegisterPayload } from './cache.type';

type SaveVerifyEmailRegisterParams = {
  email: string;
  otp: string;
};

type GetVerifyEmailRegisterParams = { email: string };

type SaveVerifyEmailRegisterReturn = {
  expiredAt: Date;
};

type GetVerifyEmailRegisterReturn = VerifyEmailRegisterPayload;

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {}

  async getVerifyEmailRegister({
    email,
  }: GetVerifyEmailRegisterParams): Promise<
    GetVerifyEmailRegisterReturn | undefined
  > {
    const KEY = `${CACHE_VERIFY_EMAIL_REGISTER_KEY}:${email}`;
    return await this._cacheManager.get(KEY);
  }

  async saveVerifyEmailRegister({
    email,
    otp,
  }: SaveVerifyEmailRegisterParams): Promise<SaveVerifyEmailRegisterReturn> {
    const TTL_MINUTE = 3;
    const KEY = `${CACHE_VERIFY_EMAIL_REGISTER_KEY}:${email}`;
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
}
