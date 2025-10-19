import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESPONSE_SUCCESS_MESSAGE_METADATA } from '@shared/decorators/response-success-message.decorator';
import { ApiResponseSuccess } from '@type/response.type';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

export class ResponseTransformInterceptor<T> implements NestInterceptor<T> {
  constructor(private readonly _reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map((response) => this._responseHandler(response, context)));
  }

  private _responseHandler<T = any>(
    res: T,
    context: ExecutionContext,
  ): ApiResponseSuccess<T> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;
    const message = this._reflector.get<string>(
      RESPONSE_SUCCESS_MESSAGE_METADATA,
      context.getHandler() || 'Success',
    );

    return {
      isSuccess: true,
      statusCode,
      message,
      data: res,
    };
  }
}
