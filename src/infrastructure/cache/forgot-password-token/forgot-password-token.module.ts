import { Module } from '@nestjs/common';
import { ForgotPasswordTokenCacheService } from './forgot-password-token.service';

@Module({
  providers: [ForgotPasswordTokenCacheService],
  exports: [ForgotPasswordTokenCacheService],
})
export class ForgotPasswordTokenCacheModule {}
