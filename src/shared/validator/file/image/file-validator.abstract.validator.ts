import { FileValidator } from '@nestjs/common';
import { ErrorCodeValues } from '@shared/constants/error-code.constant';
import { mergeErrorCodeMessage } from '@shared/utils/merge-error-code-message.util';

export abstract class FileValidatorAbstract<T> extends FileValidator<
  T & { message?: string; hasMetadata: boolean }
> {
  abstract readonly ERROR_CODE: ErrorCodeValues;
  abstract readonly DEFAULT_MESSAGE: string;

  buildErrorMessage(): string {
    return mergeErrorCodeMessage({
      message: this.validationOptions.message || this.DEFAULT_MESSAGE,
      errorCode: this.ERROR_CODE,
    });
  }
}
