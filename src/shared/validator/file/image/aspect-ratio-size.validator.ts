import {
  ERROR_CODE,
  ErrorCodeValues,
} from '@shared/constants/error-code.constant';
import { CombineFileShard } from '@shared/types/combine-file-sharp.type';
import sharp from 'sharp';
import { FileValidatorAbstract } from './file-validator.abstract.validator';

interface AspectRatioSizeValidatorOptions {
  size: number;
}

export class AspectRatioSizeValidator extends FileValidatorAbstract<AspectRatioSizeValidatorOptions> {
  readonly ERROR_CODE: ErrorCodeValues =
    ERROR_CODE.IMAGE_ASPECT_RATIO_SIZE_INVALID;
  readonly DEFAULT_MESSAGE = `Image must have the correct aspect ratio and size, expected size: ${this.validationOptions.size}x${this.validationOptions.size}`;

  private _getWidthHeightByShard(file: Express.Multer.File) {
    return sharp(file.buffer).metadata();
  }

  async isValid(
    file: Express.Multer.File | CombineFileShard,
  ): Promise<boolean> {
    const { width, height } = this.validationOptions.hasMetadata
      ? {
          width: (file as CombineFileShard).width,
          height: (file as CombineFileShard).height,
        }
      : await this._getWidthHeightByShard(file);

    if (!width || !height) {
      return false;
    }

    return (
      width === this.validationOptions.size &&
      height === this.validationOptions.size
    );
  }
}
