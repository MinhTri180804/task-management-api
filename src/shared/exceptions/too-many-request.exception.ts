import { HttpException, HttpStatus } from '@nestjs/common';

const DEFAULT_MESSAGE = 'Too many requests. Please try again later.';
const DEFAULT_ERROR_CODE = 'TOO_MANY_REQUEST';

type ConstructorParams = {
  message?: string;
  details?: object;
  errorCode?: string;
};

export class TooManyRequestsException extends HttpException {
  constructor({
    message = DEFAULT_MESSAGE,
    errorCode = DEFAULT_ERROR_CODE,
    details = {},
  }: ConstructorParams) {
    super(
      {
        message,
        // TODO: refactor
        details: {
          ...details,
          errorCode,
        },
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
