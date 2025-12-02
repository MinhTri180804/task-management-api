import { SetPasswordTokenCacheWhiteListModule } from '@core/cache/whitelist/set-password-token/set-password-token.module';
import { JwtSetPasswordTokenModule } from '@infrastructure/jwt/setPasswordToken/set-password.token.module';
import { SendMailQueueModule } from '@infrastructure/messageQueue/queues/sendMail/send-mail.queue.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthLocalController } from './local.controller';
import { AuthLocalService } from './local.service';
import { VerifyEmailRegisterCacheWhiteListModule } from '@core/cache/whitelist/verify-email-register/verify-email-register.module';

@Module({
  imports: [
    SendMailQueueModule,
    UserModule,
    JwtSetPasswordTokenModule,
    SetPasswordTokenCacheWhiteListModule,
    VerifyEmailRegisterCacheWhiteListModule,
  ],
  controllers: [AuthLocalController],
  providers: [AuthLocalService],
  exports: [],
})
export class AuthLocalModule {}
