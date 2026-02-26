import { FileValidator } from '@nestjs/common';
import { ErrorCodeValues } from '@shared/constants/error-code.constant';
import { mergeErrorCodeMessage } from '@shared/utils/merge-error-code-message.util';
import sharp from 'sharp';

export abstract class FileValidatorAbstract<T> extends FileValidator<
  T & { message?: string; hasMetadata: boolean }
> {
  abstract readonly ERROR_CODE: ErrorCodeValues;
  abstract readonly DEFAULT_MESSAGE: string;

  protected getWidthHeightByShard(file: Express.Multer.File) {
    return sharp(file.buffer).metadata();
  }

  buildErrorMessage(): string {
    return mergeErrorCodeMessage({
      message: this.validationOptions.message || this.DEFAULT_MESSAGE,
      errorCode: this.ERROR_CODE,
    });
  }
}
