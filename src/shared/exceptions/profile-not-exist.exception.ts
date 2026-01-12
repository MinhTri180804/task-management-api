import { HttpException, HttpStatus } from '@nestjs/common';

const DEFAULT_MESSAGE = 'Profile not found.';
const DEFAULT_ERROR_CODE = 'PROFILE_NOT_FOUND';
const DEFAULT_STATUS_CODE = HttpStatus.NOT_FOUND;

export class UserProfileNotExistException extends HttpException {
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
