import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ERROR_CODE,
  ErrorCodeValues,
} from '@shared/constants/error-code.constant';

const DEFAULT_MESSAGE = 'Profile already exists.';
const DEFAULT_ERROR_CODE = ERROR_CODE.PROFILE_EXISTS;
const DEFAULT_STATUS_CODE = HttpStatus.BAD_REQUEST;

export class UserProfileExistException extends HttpException {
  constructor({
    message = DEFAULT_MESSAGE,
    errorCode = DEFAULT_ERROR_CODE,
  }: {
    message?: string;
    errorCode?: ErrorCodeValues;
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
