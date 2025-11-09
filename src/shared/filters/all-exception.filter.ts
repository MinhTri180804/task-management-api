import { NodeEnvEnum } from 'src/core/enum/node-env.enum';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseErrorParamExceptionObject } from 'src/core/types/common.type';
import { ApiResponseError } from 'src/core/types/response.type';
import { Response } from 'express';
import { STATUS_CODES } from 'http';

export class AllExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let responseBody = this._defaultResponseBody();

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      responseBody = this._mapExceptionToResponse(responseBody, exception);

      if (typeof exceptionResponse === 'string') {
        responseBody.message = exceptionResponse;
      } else if (
        (exceptionResponse as BaseErrorParamExceptionObject)?.details
      ) {
        responseBody.details =
          (exceptionResponse as BaseErrorParamExceptionObject).details ?? null;
      }

      if (process.env.NODE_ENV !== NodeEnvEnum.DEVELOPMENT)
        delete responseBody.stacks;

      response.status(responseBody.statusCode).json(responseBody);
    }
  }

  private _defaultResponseBody(): ApiResponseError {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = STATUS_CODES[status] as string;
    const details: string | object | null = null;
    const cause: unknown = null;
    const stacks: unknown = null;

    return {
      isSuccess: false,
      statusCode: status,
      message,
      details,
      cause,
      stacks,
    };
  }

  private _mapExceptionToResponse(
    responseReference: ApiResponseError,
    exception: HttpException,
  ): ApiResponseError {
    return {
      ...responseReference,
      statusCode: exception.getStatus(),
      message: exception.message,
      cause: exception.cause,
      stacks: exception.stack,
    };
  }
}
