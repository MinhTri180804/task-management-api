import {
  ERROR_CODE,
  ErrorCodeValues,
} from '@shared/constants/error-code.constant';
import { FileValidatorAbstract } from './file-validator.abstract.validator';
import { CombineFileShard } from '@shared/types/combine-file-sharp.type';

interface AspectRatioSizeMinMaxValidatorOptions {
  min: number;
  max: number;
}

export class AspectRatioSizeMinMaxValidator extends FileValidatorAbstract<AspectRatioSizeMinMaxValidatorOptions> {
  ERROR_CODE: ErrorCodeValues =
    ERROR_CODE.IMAGE_ASPECT_RATIO_SIZE_MIN_MAX_INVALID;
  DEFAULT_MESSAGE: string = `Image aspect ratio size min: ${this.validationOptions.min}x${this.validationOptions.min} max: ${this.validationOptions.max}x${this.validationOptions.max} is invalid`;

  async isValid(
    file: Express.Multer.File | CombineFileShard,
  ): Promise<boolean> {
    const { width, height } = this.validationOptions.hasMetadata
      ? {
          width: (file as CombineFileShard).width,
          height: (file as CombineFileShard).height,
        }
      : await this.getWidthHeightByShard(file);

    if (!width || !height) {
      return false;
    }

    return (
      width >= this.validationOptions.min &&
      width <= this.validationOptions.max &&
      height >= this.validationOptions.min &&
      height <= this.validationOptions.max
    );
  }
}
