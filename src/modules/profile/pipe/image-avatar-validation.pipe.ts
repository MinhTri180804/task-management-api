import {
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { ERROR_CODE } from '@shared/constants/error-code.constant';
import { FileException } from '@shared/exceptions/file.exception';
import { mergeErrorCodeMessage } from '@shared/utils/merge-error-code-message.util';
import { parseErrorCodeMessage } from '@shared/utils/parse-error-code-message.util';
import { AspectRatioSizeValidator } from '@shared/validator/file/image/aspect-ratio-size.validator';
import { AspectRatioValidator } from '@shared/validator/file/image/aspect-ratio.validator';

/**
 * A custom pipe that validates the uploaded file meets certain criteria.
 *
 * @class ImageAvatarValidationPipe
 * @implements {ParseFilePipe}
 */
@Injectable()
export class ImageAvatarValidationPipe extends ParseFilePipe {
  /**
   * The maximum file size in MB.
   *
   * @static
   * @type {number}
   * @memberof ImageAvatarValidationPipe
   */
  static readonly maxSizeMB = 2;

  /**
   * The aspect ratio of the image.
   *
   * @static
   * @type {number}
   * @memberof ImageAvatarValidationPipe
   */
  static readonly aspectRatio = 1;

  /**
   * The aspect ratio size of the image.
   *
   * @static
   * @type {number}
   * @memberof ImageAvatarValidationPipe
   */
  static readonly aspectRatioSize = 500;

  /**
   * The allowed file types for the image.
   *
   * @static
   * @type {string[]}
   * @memberof ImageAvatarValidationPipe
   */
  static readonly fileTypes = ['jpeg', 'jpg', 'png', 'webp'];

  /**
   * Creates an instance of ImageAvatarValidationPipe.
   *
   * @constructor
   * @param {boolean} [HAS_IMAGE_METADATA_PIPE=false] - Indicates whether the file has metadata.
   * @memberof ImageAvatarValidationPipe
   */
  constructor(readonly HAS_IMAGE_METADATA_PIPE: boolean = false) {
    super({
      validators: [
        new MaxFileSizeValidator({
          maxSize: ImageAvatarValidationPipe.maxSizeMB * 1024 * 1024,
          errorMessage: mergeErrorCodeMessage({
            message: `File size must be less than ${ImageAvatarValidationPipe.maxSizeMB}MB`,
            errorCode: ERROR_CODE.MAX_SIZE_FILE_INVALID,
          }),
        }),

        new FileTypeValidator({
          fileType: /png|jpg|jpeg|webp/,
          errorMessage: mergeErrorCodeMessage({
            message: `File type must be ${ImageAvatarValidationPipe.fileTypes.join(', ')}`,
            errorCode: ERROR_CODE.TYPE_FILE_INVALID,
          }),
        }),

        new AspectRatioValidator({
          ratio: ImageAvatarValidationPipe.aspectRatio,
          message: `Image aspect ratio must be ${ImageAvatarValidationPipe.aspectRatio}`,
          hasMetadata: HAS_IMAGE_METADATA_PIPE,
        }),

        new AspectRatioSizeValidator({
          size: ImageAvatarValidationPipe.aspectRatioSize,
          hasMetadata: HAS_IMAGE_METADATA_PIPE,
          message: `Image aspect ratio size must be ${ImageAvatarValidationPipe.aspectRatioSize}x${ImageAvatarValidationPipe.aspectRatioSize}`,
        }),
      ],

      exceptionFactory(error) {
        const { message, errorCode } = parseErrorCodeMessage(error);

        return new FileException({ message, errorCode });
      },
    });
  }
}
