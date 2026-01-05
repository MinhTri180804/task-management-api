import { Module } from '@nestjs/common';
import { VerifyEmailRegisterCacheService } from './verify-email-register.service';

@Module({
  providers: [VerifyEmailRegisterCacheService],
  exports: [VerifyEmailRegisterCacheService],
})
export class VerifyEmailRegisterCacheModule {}
