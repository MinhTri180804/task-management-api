import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { MessageQueueSetupFactory } from './message-queue-setup.factory';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useClass: MessageQueueSetupFactory,
    }),
  ],
  providers: [],
})
export class MessageQueueModule {}
