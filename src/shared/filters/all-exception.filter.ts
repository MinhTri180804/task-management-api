import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponseError } from '@type/response.type';
import { Response } from 'express';
import { STATUS_CODES } from 'http';

export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = STATUS_CODES[status];
    let details: string | object | null = null;
    let cause: unknown = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      cause = exception.cause;

      if (exception instanceof BadRequestException) {
        const exceptionResponse = exception.getResponse() as {
          details: object | string;
        };

        details = exceptionResponse.details ?? 'UNKNOWN';
      }

      const responseBody: ApiResponseError = {
        isSuccess: false,
        statusCode: status,
        message,
        details,
        cause,
      };

      response.status(status).json(responseBody);
    }
  }
}
