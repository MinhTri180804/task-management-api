import { CacheModule } from '@core/cache/cache.module';
import { ConfigModule } from '@core/config/config.module';
import { MailModule } from '@core/mail/mail.module';
import { MessageQueueModule } from '@core/messageQueue/message-queue.module';
import { DatabaseModule } from '@core/mongoose/mongoose.module';
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
