import { SetPasswordPayload } from './cache-payload.type';

export type GetSetPasswordReturn = Promise<SetPasswordPayload | undefined>;
export type DeleteSetPasswordReturn = Promise<boolean>;
export type SaveSetPasswordReturn = Promise<void>;
