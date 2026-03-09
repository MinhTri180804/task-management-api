import { CacheManagerService } from '@infrastructure/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { BaseJsonWebTokenCacheAbstract } from 'src/core/base/cache/jwt/base-jwt-token-cache.abstract';

@Injectable()
export class SetPasswordTokenCacheService extends BaseJsonWebTokenCacheAbstract {
  constructor(protected readonly cacheManagerService: CacheManagerService) {
    super(cacheManagerService, 'set-password-token', null);
  }

  getTokenId({ userId, jti }: { userId: string; jti: string }) {
    return `${userId}:${jti}`;
  }
}
