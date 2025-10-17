import { MailService } from '@modules/mail/mail.service';
import {
  SEND_MAIL_QUEUE_JOB,
  SEND_MAIL_QUEUE_NAME,
} from '@modules/messageQueue/message-queue.constant';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor(SEND_MAIL_QUEUE_NAME)
export class SendMailConsumer extends WorkerHost {
  constructor(private readonly _mailService: MailService) {
    super();
  }

  async process(job: Job<{ emailTo: string }>): Promise<any> {
    switch (job.name) {
      case SEND_MAIL_QUEUE_JOB.WELCOME:
        await this._mailService.sendWelcomeEmail(job.data.emailTo);
        break;

      default:
        throw new Error('No job name match');
    }
  }
}
