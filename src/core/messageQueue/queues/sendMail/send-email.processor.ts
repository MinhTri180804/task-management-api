import { MailService } from '@core/mail/mail.service';
import {
  SEND_MAIL_QUEUE_JOB,
  SEND_MAIL_QUEUE_NAME,
} from '@core/messageQueue/message-queue.constant';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { VerifyEmailRegisterData } from './send-email.type';

@Processor(SEND_MAIL_QUEUE_NAME)
export class SendMailConsumer extends WorkerHost {
  constructor(private readonly _mailService: MailService) {
    super();
  }

  async process(
    job: Job<{ emailTo: string } | VerifyEmailRegisterData>,
  ): Promise<any> {
    switch (job.name) {
      case SEND_MAIL_QUEUE_JOB.VERIFY_EMAIL_REGISTER: {
        const { email, expiredAt, otp } = job.data as VerifyEmailRegisterData;
        await this._mailService.sendVerifyEmailRegister({
          email,
          otp,
          expiredAt,
        });
        break;
      }

      default:
        throw new Error('No job name match');
    }
  }
}
