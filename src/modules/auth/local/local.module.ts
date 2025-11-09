import { Module } from '@nestjs/common';
import { AuthLocalController } from './local.controller';
import { AuthLocalService } from './local.service';
import { SendMailQueueModule } from '@core/messageQueue/queues/sendMail/send-mail.queue.module';
import { UserModule } from '@modules/user/user.module';
import { CacheWhiteListModule } from '@core/cache/whitelist/cache-white-list.module';
import { JwtSetPasswordTokenModule } from '@core/jwt/setPasswordToken/set-password.token.module';

@Module({
  imports: [
    SendMailQueueModule,
    UserModule,
    JwtSetPasswordTokenModule,
    CacheWhiteListModule,
  ],
  controllers: [AuthLocalController],
  providers: [AuthLocalService],
  exports: [],
})
export class AuthLocalModule {}
