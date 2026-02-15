import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponseError } from '@type/response.type';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { ERROR_CODE } from './error-code.constant';

@Catch(MongoServerError)
export class MongoServerExceptionFilter implements ExceptionFilter {
  private _DUPLICATE_KEY_ERROR = 11000;

  private _duplicateKey(exception: MongoServerError) {
    let message: string = 'Duplicate Key Error';
    const errorCode = ERROR_CODE.DUPLICATE_KEY;

    if (exception.keyValue) {
      const [field, value] = Object.entries(
        exception.keyValue as { [key: string]: string },
      )[0];
      message = `${field} ${value} already exists`;
    }

    return {
      message,
      errorCode,
    };
  }

  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.BAD_REQUEST;
    let message = exception.message;
    let errorCode = ERROR_CODE.UNKNOWN;

    if (exception.code === this._DUPLICATE_KEY_ERROR) {
      const errorContent = this._duplicateKey(exception);
      message = errorContent.message;
      errorCode = errorContent.errorCode;
    }

    const errorResponse: ApiResponseError = {
      isSuccess: false,
      message,
      statusCode,
      details: null,
      cause: exception.cause,
      stacks: exception.stack,
      errorCode,
    };

    response.status(statusCode).json(errorResponse);
  }
}
