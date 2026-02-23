import { HttpException, HttpStatus } from '@nestjs/common';

const DEFAULT_ERROR_CODE = 'FILE_ERROR';
const DEFAULT_STATUS_CODE = HttpStatus.BAD_REQUEST;

export class FileException extends HttpException {
  constructor({ message, errorCode = DEFAULT_ERROR_CODE }) {
    super(
      {
        message,
        errorCode,
      },
      DEFAULT_STATUS_CODE,
    );
  }
}
