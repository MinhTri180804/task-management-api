import { CacheManagerService } from '@infrastructure/cache/cache.service';
import { IBaseOtpCache } from './otp-cache.interface';
import { SCOPE } from '../constant';

type OtpCachePayload = {
  otp: string;
  createdAt: number;
};

export abstract class BaseOtpCacheAbstract implements IBaseOtpCache {
  constructor(
    protected readonly cacheManagerService: CacheManagerService,
    // ttl is second
    protected readonly ttl: number,
    protected readonly prefix: string,
  ) {}

  protected getKeyWL(id: string) {
    return `${SCOPE.WHITE_LIST}:${this.prefix}:${id}`;
  }

  async get<T = OtpCachePayload>({
    email,
  }: {
    email: string;
  }): Promise<T | undefined> {
    const key = this.getKeyWL(email);
    return (await this.cacheManagerService.get<OtpCachePayload>(key)) as T;
  }

  async set<T = OtpCachePayload>({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<T> {
    const key = this.getKeyWL(email);

    const payload: OtpCachePayload = {
      otp,
      createdAt: Date.now(),
    };

    await this.cacheManagerService.set<OtpCachePayload>(
      key,
      payload,
      this.ttl * 1000,
    );

    return payload as T;
  }

  async exist({ email }: { email: string }): Promise<boolean> {
    const key = this.getKeyWL(email);
    const value = await this.cacheManagerService.get(key);
    return value !== undefined;
  }

  async revoke({ email }: { email: string }): Promise<void> {
    const key = this.getKeyWL(email);
    await this.cacheManagerService.del(key);
    return;
  }

  async isMatch({
    email,
    otp,
  }: {
    email: string;
    otp: string;
  }): Promise<boolean> {
    const otpCache = await this.get({ email });
    if (!otpCache) return false;

    return otpCache.otp === otp;
  }
}
