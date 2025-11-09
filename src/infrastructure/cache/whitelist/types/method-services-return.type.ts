import { VerifyEmailRegisterPayload } from './cache-payload.type';

export type SaveVerifyEmailRegisterReturn = {
  expiredAt: Date;
};

export type GetVerifyEmailRegisterReturn = VerifyEmailRegisterPayload;
export type DeleteVerifyEmailRegisterReturn = Promise<boolean>;
