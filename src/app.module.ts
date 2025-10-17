import { CacheModule } from '@modules/cache/cache.module';
import { ConfigModule } from '@modules/config/config.module';
import { MailModule } from '@modules/mail/mail.module';
import { MessageQueueModule } from '@modules/messageQueue/message-queue.module';
import { DatabaseModule } from '@modules/mongoose/mongoose.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    CacheModule,
    MailModule,
    MessageQueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
