import { HttpException, HttpStatus } from '@nestjs/common';

const DEFAULT_MESSAGE = 'Profile already exists.';
const DEFAULT_ERROR_CODE = 'PROFILE_EXIST';
const DEFAULT_STATUS_CODE = HttpStatus.BAD_REQUEST;

export class UserProfileExistException extends HttpException {
  constructor({ message = DEFAULT_MESSAGE }) {
    super(
      {
        message,
        errorCode: DEFAULT_ERROR_CODE,
      },
      DEFAULT_STATUS_CODE,
    );
  }
}
