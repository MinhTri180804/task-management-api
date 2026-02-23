/**
 * Validates the width of an image file.
 */
import { FileValidator } from '@nestjs/common';
import { CombineFileShard } from '@shared/types/combine-file-sharp.type';
import shard from 'sharp';
import { FileValidatorAbstract } from './file-validator.abstract.validator';
import {
  ErrorCodeValues,
  ERROR_CODE,
} from '@shared/constants/error-code.constant';

/**
 * Validation options for the WidthImageValidator.
 */
interface WidthImageValidatorOptions {
  /**
   * Minimum width of the image.
   */
  minWidth?: number;

  /**
   * Maximum width of the image.
   */
  maxWidth?: number;

  /**
   * Custom error message.
   */
  message?: string;

  /**
   * Whether to use the width from the metadata object or the sharp library.
   */
  hasMetadata: boolean;
}

/**
 * Validates the width of an image file.
 */
export class WidthImageValidator extends FileValidatorAbstract<WidthImageValidatorOptions> {
  /**
   * Default error message.
   */
  readonly DEFAULT_MESSAGE = `Width must be between ${this.validationOptions.minWidth} and ${this.validationOptions.maxWidth}`;
  readonly ERROR_CODE: ErrorCodeValues = ERROR_CODE.WIDTH_IMAGE_INVALID;

  /**
   * Retrieves the width of an image file using the sharp library.
   * @param file - The image file to retrieve the width from.
   * @returns The width of the image file.
   */
  private readonly _getWidthBySharp = async (file: Express.Multer.File) => {
    const { width } = await shard(file.buffer).metadata();
    return width;
  };

  /**
   * Validates the width of an image file.
   * @param file - The image file to validate.
   * @note If hasMetadata is true, the width will be retrieved from the metadata object, type is CombineFileShard.
   * @note If hasMetadata is false, the width will be retrieved using the sharp library, type is Express.Multer.File.
   * @returns True if the width of the image is within the specified range, false otherwise.
   */
  async isValid(
    file: Express.Multer.File | CombineFileShard,
  ): Promise<boolean> {
    if (!this.validationOptions.maxWidth && !this.validationOptions.minWidth) {
      return true;
    }

    const width = this.validationOptions.hasMetadata
      ? (file as CombineFileShard).width
      : await this._getWidthBySharp(file);
    if (!width) {
      return false;
    }

    if (
      this.validationOptions.minWidth &&
      width < this.validationOptions.minWidth
    ) {
      return false;
    }

    if (
      this.validationOptions.maxWidth &&
      width > this.validationOptions.maxWidth
    ) {
      return false;
    }

    return true;
  }
}
