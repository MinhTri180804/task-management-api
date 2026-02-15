import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { NodemailerAdapter } from './nodemailer.adapter';
import * as MailToken from './mail.token';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MailService,
    {
      provide: MailToken.MAILER_PORT_TOKEN,
      useClass: NodemailerAdapter,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
