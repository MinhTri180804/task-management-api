import {
  MESSAGE_QUEUE_PREFIX,
  SEND_MAIL_QUEUE_NAME,
} from '@core/messageQueue/message-queue.constant';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { SendMailQueueService } from './send-mail.queue.service';
import { MailModule } from '@core/mail/mail.module';
import { SendMailConsumer } from './send-email.processor';

@Module({
  imports: [
    MailModule,
    BullModule.registerQueue({
      name: SEND_MAIL_QUEUE_NAME,
      prefix: MESSAGE_QUEUE_PREFIX,
    }),
  ],
  providers: [SendMailQueueService, SendMailConsumer],
  exports: [SendMailQueueService],
})
export class SendMailQueueModule {}
