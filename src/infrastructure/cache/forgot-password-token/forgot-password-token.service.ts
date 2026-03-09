import { CacheManagerService } from '@infrastructure/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { BaseJsonWebTokenCacheAbstract } from '@core/base/cache/jwt/base-jwt-token-cache.abstract';

@Injectable()
export class ForgotPasswordTokenCacheService extends BaseJsonWebTokenCacheAbstract {
  constructor(protected readonly cacheManagerService: CacheManagerService) {
    super(cacheManagerService, 'forgot-password-token', null);
  }
}
