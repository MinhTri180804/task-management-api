import {
  ExpiresInConfig,
  ExpiresInConfigName,
} from '@config/expires-in.config';
import { CacheManagerService } from '@core/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseOtpCacheAbstract } from 'src/core/base/cache/otp/otp-cache.abstract';
import { IBaseOtpCache } from 'src/core/base/cache/otp/otp-cache.interface';

@Injectable()
export class VerifyEmailRegisterCacheService
  extends BaseOtpCacheAbstract
  implements IBaseOtpCache
{
  constructor(
    protected readonly cacheManagerService: CacheManagerService,
    private readonly configService: ConfigService,
  ) {
    const { verifyEmailRegisterSecond } =
      configService.getOrThrow<ExpiresInConfig>(ExpiresInConfigName);

    super(
      cacheManagerService,
      verifyEmailRegisterSecond,
      'verify-email-register',
    );
  }

  getExpiresAt({ createdAt }: { createdAt: number }): Date {
    const { verifyEmailRegisterSecond } =
      this.configService.getOrThrow<ExpiresInConfig>(ExpiresInConfigName);

    return new Date(createdAt + verifyEmailRegisterSecond * 1000);
  }
}
