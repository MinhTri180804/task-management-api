import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ERROR_CODE,
  ErrorCodeValues,
} from '@shared/constants/error-code.constant';

const DEFAULT_ERROR_CODE = ERROR_CODE.FILE_ERROR;
const DEFAULT_STATUS_CODE = HttpStatus.BAD_REQUEST;
const DEFAULT_MESSAGE = 'File error';

export class FileException extends HttpException {
  constructor({
    message = DEFAULT_MESSAGE,
    errorCode = DEFAULT_ERROR_CODE,
  }: {
    message: string;
    errorCode: ErrorCodeValues;
  }) {
    super(
      {
        message,
        errorCode,
      },
      DEFAULT_STATUS_CODE,
    );
  }
}
