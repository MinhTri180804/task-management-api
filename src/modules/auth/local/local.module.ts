import { Module } from '@nestjs/common';
import { AuthLocalController } from './local.controller';
import { AuthLocalService } from './local.service';
import { SendMailQueueModule } from '@core/messageQueue/queues/sendMail/send-mail.queue.module';
import { UserModule } from '@modules/user/user.module';
import { JwtInitProfileTokenModule } from '@core/jwt/initProfileToken/init-profile-token.module';

@Module({
  imports: [SendMailQueueModule, UserModule, JwtInitProfileTokenModule],
  controllers: [AuthLocalController],
  providers: [AuthLocalService],
  exports: [],
})
export class AuthLocalModule {}
