import { HttpException, HttpStatus } from '@nestjs/common';
import { type BaseErrorParamExceptionObject } from '@type/common.type';

const DEFAULT_MESSAGE = 'Token invalid';
const DEFAULT_ERROR_CODE = 'TOKEN_INVALID';

type ConstructorParams = BaseErrorParamExceptionObject & {};

export class TokenInvalidException extends HttpException {
  constructor({
    message = DEFAULT_MESSAGE,
    errorCode = DEFAULT_ERROR_CODE,
    details = {},
  }: ConstructorParams) {
    super(
      {
        message,
        details,
        errorCode,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
