import { HttpException, HttpStatus } from '@nestjs/common';
import { type BaseErrorParamExceptionObject } from '@type/common.type';

const DEFAULT_ERROR_CODE = 'VALIDATION_REQUEST';
const DEFAULT_MESSAGE = 'Validation request failed';

type ConstructorParams = BaseErrorParamExceptionObject & {
  details: {
    field: string;
    message: string[];
  }[];
};

export class ValidationRequestException extends HttpException {
  constructor({
    message = DEFAULT_MESSAGE,
    errorCode = DEFAULT_ERROR_CODE,
    details,
  }: ConstructorParams) {
    super({ message, errorCode, details }, HttpStatus.BAD_REQUEST);
  }
}
