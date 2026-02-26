import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_CODE } from '@shared/constants/error-code.constant';
import { type BaseErrorParamExceptionObject } from '@type/common.type';

const DEFAULT_MESSAGE = 'Too many requests. Please try again later.';
const DEFAULT_ERROR_CODE = ERROR_CODE.TOO_MANY_REQUEST;
const DEFAULT_STATUS_CODE = HttpStatus.TOO_MANY_REQUESTS;

type ConstructorParams = BaseErrorParamExceptionObject & {};

export class TooManyRequestsException extends HttpException {
  constructor({
    message = DEFAULT_MESSAGE,
    errorCode = DEFAULT_ERROR_CODE,
    details = {},
  }: ConstructorParams) {
    super(
      {
        message,
        errorCode,
        details,
      },
      DEFAULT_STATUS_CODE,
    );
  }
}
