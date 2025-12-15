import { SetMetadata } from '@nestjs/common';

export const RESPONSE_SUCCESS_STATUS_METADATA = 'response_success_status';

export const ResponseSuccessStatus = (status: number) =>
  SetMetadata(RESPONSE_SUCCESS_STATUS_METADATA, status);
