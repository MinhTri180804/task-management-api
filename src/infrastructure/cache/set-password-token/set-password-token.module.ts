import { Module } from '@nestjs/common';
import { SetPasswordTokenCacheService } from './set-password-token.service';

@Module({
  providers: [SetPasswordTokenCacheService],
  exports: [SetPasswordTokenCacheService],
})
export class SetPasswordTokenCacheModule {}
