/**
 * The type that represents the combined file object which contains the width and height information
 * from the metadata of the image file.
 * Using when has ImageMetadataPipe and need to get the width and height of the image file from the metadata.
 *
 */
export type CombineFileShard = Express.Multer.File & {
  /**
   * The width of the image file.
   */
  width: number;
  /**
   * The height of the image file.
   */
  height: number;
};
