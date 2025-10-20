import { SetMetadata } from '@nestjs/common';

export const RESPONSE_SUCCESS_MESSAGE_METADATA = 'response_success_message';

export const ResponseSuccessMessage = (message: string) =>
  SetMetadata(RESPONSE_SUCCESS_MESSAGE_METADATA, message);
