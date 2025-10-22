import {
  SEND_MAIL_QUEUE_JOB,
  SEND_MAIL_QUEUE_NAME,
} from '@core/messageQueue/message-queue.constant';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  CreateProfileRegisterParams,
  VerifyEmailRegisterParams,
} from './send-email.type';

@Injectable()
export class SendMailQueueService {
  constructor(
    @InjectQueue(SEND_MAIL_QUEUE_NAME) private readonly _sendMailQueue: Queue,
  ) {}

  async welcome() {
    await this._sendMailQueue.add(SEND_MAIL_QUEUE_JOB.WELCOME, {
      emailTo: 'nguyenminhtri1808t@gmail.com',
    });
  }

  async verifyEmailRegister({
    otp,
    expiredAt,
    email,
  }: VerifyEmailRegisterParams) {
    await this._sendMailQueue.add(SEND_MAIL_QUEUE_JOB.VERIFY_EMAIL_REGISTER, {
      otp,
      expiredAt,
      email,
    } as VerifyEmailRegisterParams);
  }

  async createProfileRegister({
    email,
    expiresIn,
    token,
  }: CreateProfileRegisterParams) {
    await this._sendMailQueue.add(SEND_MAIL_QUEUE_JOB.CREATE_PROFILE_REGISTER, {
      email,
      expiresIn,
      token,
    } as CreateProfileRegisterParams);
  }
}
