import { SetMetadata } from '@nestjs/common';

export const RESPONSE_SUCCESS_MESSAGE_METADATA = 'responseSuccessMessage';

export const ResponseSuccessMessage = (message: string) =>
  SetMetadata(RESPONSE_SUCCESS_MESSAGE_METADATA, message);
