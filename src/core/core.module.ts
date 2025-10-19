import { Module } from '@nestjs/common';
import { CacheModule } from './cache/cache.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from './config/config.module';
import { MessageQueueModule } from './messageQueue/message-queue.module';
import { MongoModule } from './mongo/mongoose.module';

@Module({
  imports: [
    CacheModule,
    ConfigModule,
    MailModule,
    MessageQueueModule,
    MongoModule,
  ],
})
export class CoreModule {}
