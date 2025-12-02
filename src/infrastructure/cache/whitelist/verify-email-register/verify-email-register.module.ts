import { Module } from '@nestjs/common';
import { VerifyEmailRegisterCacheWhiteListService } from './verify-email-register.service';
import { CACHE_SERVICE_TOKEN } from '@core/cache/cache.token';

@Module({
  providers: [
    {
      provide: CACHE_SERVICE_TOKEN.WHITE_LIST.VERIFY_EMAIL_REGISTER,
      useClass: VerifyEmailRegisterCacheWhiteListService,
    },
  ],
  exports: [CACHE_SERVICE_TOKEN.WHITE_LIST.VERIFY_EMAIL_REGISTER],
})
export class VerifyEmailRegisterCacheWhiteListModule {}
