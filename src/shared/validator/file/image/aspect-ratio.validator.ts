/**
 * Validates the aspect ratio of an image file.
 */
import { FileValidator } from '@nestjs/common';
import { CombineFileShard } from '@shared/types/combine-file-sharp.type';
import sharp from 'sharp';
import { FileValidatorAbstract } from './file-validator.abstract.validator';
import {
  ERROR_CODE,
  ErrorCodeValues,
} from '@shared/constants/error-code.constant';

/**
 * Validation options for the AspectRatioValidator.
 */
interface AspectRatioValidatorOptions {
  /**
   * The expected aspect ratio of the image file.
   */
  ratio: number;

  /**
   * Whether to retrieve the width and height from the metadata object instead of using the sharp library.
   */
  hasMetadata: boolean;

  /**
   * The error message to display if the validation fails.
   */
  message?: string;
}

/**
 * Validates the aspect ratio of an image file.
 */
export class AspectRatioValidator extends FileValidatorAbstract<AspectRatioValidatorOptions> {
  /**
   * The default error message if none is provided.
   */
  readonly ERROR_CODE: ErrorCodeValues = ERROR_CODE.IMAGE_ASPECT_RATIO_INVALID;
  readonly DEFAULT_MESSAGE = `Image aspect ratio must be ${this.validationOptions.ratio}`;

  /**
   * Retrieves the width and height of an image file using the sharp library.
   * @param file - The image file to retrieve the width and height from.
   * @returns An object containing the width and height of the image file.
   */
  private async _getWidthHeightBySharp(file: Express.Multer.File) {
    return sharp(file.buffer).metadata();
  }

  /**
   * Validates the aspect ratio of an image file.
   * @param file - The image file to validate.
   * @returns True if the aspect ratio of the image is within the specified range, false otherwise.
   * @note If hasMetadata is true, the width will be retrieved from the metadata object, type is CombineFileShard.
   * @note If hasMetadata is false, the width will be retrieved using the sharp library, type is Express.Multer.File.
   */
  async isValid(
    file: Express.Multer.File | CombineFileShard,
  ): Promise<boolean> {
    const metadata = this.validationOptions.hasMetadata
      ? {
          width: (file as CombineFileShard).width,
          height: (file as CombineFileShard).height,
        }
      : await this._getWidthHeightBySharp(file);

    const { width, height } = metadata;

    if (!width || !height) {
      return false;
    }
    return width / height === 1;
  }
}
