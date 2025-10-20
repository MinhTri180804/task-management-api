import { NodeEnvEnum } from '@enum/node-env.enum';
import {
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseErrorParamExceptionObject } from '@type/common.type';
import { ApiResponseError } from '@type/response.type';
import { cleanObject } from '@util/clean-object.util';
import { Response } from 'express';
import { STATUS_CODES } from 'http';

export class AllExceptionFilter implements ExceptionFilter {
  private readonly _exceptionHandlers = new Map<
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    Function,
    (ex: HttpException) => BaseErrorParamExceptionObject
  >([[BadRequestException, (ex) => this._badRequestExceptionHandler(ex)]]);

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
      }

      for (const [
        ExceptionType,
        handler,
      ] of this._exceptionHandlers.entries()) {
        if (exception instanceof ExceptionType) {
          const exceptionContentBody = handler(exception);
          responseBody = { ...responseBody, ...exceptionContentBody };
        }
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

  // ====== Method Handler Exception ======
  private _badRequestExceptionHandler(
    exception: HttpException,
  ): BaseErrorParamExceptionObject {
    const result: BaseErrorParamExceptionObject = {
      details: undefined,
      message: undefined,
    };
    const badRequestResponse: BaseErrorParamExceptionObject =
      exception.getResponse() as object;

    if (typeof badRequestResponse !== 'string') {
      if (badRequestResponse.details) {
        result.details = badRequestResponse.details;
      }

      if (badRequestResponse.message) {
        result.message = badRequestResponse.message;
      }
    }

    return cleanObject({ object: result });
  }
}
