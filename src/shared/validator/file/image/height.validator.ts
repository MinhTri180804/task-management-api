import { FileValidator } from '@nestjs/common';
import shard from 'sharp';
import { CombineFileShard } from '@shared/types/combine-file-sharp.type';
import { FileValidatorAbstract } from './file-validator.abstract.validator';
import {
  ERROR_CODE,
  ErrorCodeValues,
} from '@shared/constants/error-code.constant';

interface HeightImageValidatorOptions {
  minHeight?: number;
  maxHeight?: number;
  message?: string;

  /**
   * @Note If use image-metadata pipe, should set true for hasMetadata field because it helps we don't rely on sharp to get metadata image.
   */
  hasMetadata: boolean;
}

/**
 * Validates the height of an image file.
 */
export class HeightImageValidator extends FileValidatorAbstract<HeightImageValidatorOptions> {
  /**
   * The default error message if the height of the image is not within the specified range.
   */
  readonly DEFAULT_MESSAGE = `Height must be between ${this.validationOptions.minHeight} and ${this.validationOptions.maxHeight}`;
  readonly ERROR_CODE: ErrorCodeValues = ERROR_CODE.HIGHT_IMAGE_INVALID;

  /**
   * Retrieves the height of an image file using the sharp library.
   * @param file - The image file to retrieve the height from.
   * @returns The height of the image file.
   */
  private async _getHeightBySharp(file: Express.Multer.File) {
    const { height } = await shard(file.buffer).metadata();
    return height;
  }

  /**
   * Validates the height of an image file.
   * @param file - The image file to validate.
   * @returns True if the height of the image is within the specified range, false otherwise.
   * @note if hasMetadata is true, the validator will use the height from the metadata object, otherwise it will use the height from the sharp library.
   * @note If hasMetadata is true, the width will be retrieved from the metadata object, type is CombineFileShard.
   * @note If hasMetadata is false, the width will be retrieved using the sharp library, type is Express.Multer.File.
   */
  async isValid(
    file: Express.Multer.File | CombineFileShard,
  ): Promise<boolean> {
    if (
      !this.validationOptions.minHeight &&
      !this.validationOptions.maxHeight
    ) {
      return true;
    }

    const height = this.validationOptions.hasMetadata
      ? (file as CombineFileShard).height
      : await this._getHeightBySharp(file);

    if (!height) {
      return false;
    }

    if (
      this.validationOptions.minHeight &&
      height < this.validationOptions.minHeight
    ) {
      return false;
    }

    if (
      this.validationOptions.maxHeight &&
      height > this.validationOptions.maxHeight
    ) {
      return false;
    }

    return true;
  }
}
