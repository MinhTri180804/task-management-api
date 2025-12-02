import { Module } from '@nestjs/common';
import { SetPasswordTokenCacheWhiteListService } from './set-password.token.service';
import { CACHE_SERVICE_TOKEN } from '@core/cache/cache.token';

@Module({
  providers: [
    {
      provide: CACHE_SERVICE_TOKEN.WHITE_LIST.SET_PASSWORD_TOKEN,
      useClass: SetPasswordTokenCacheWhiteListService,
    },
  ],
  exports: [CACHE_SERVICE_TOKEN.WHITE_LIST.SET_PASSWORD_TOKEN],
})
export class SetPasswordTokenCacheWhiteListModule {}
