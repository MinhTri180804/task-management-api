import { Injectable, PipeTransform } from '@nestjs/common';
import { CombineFileShard } from '@shared/types/combine-file-sharp.type';
import sharp from 'sharp';

/**
 * A pipe that extracts metadata from an image file using sharp library,
 * and merges it with the original file object.
 */
@Injectable()
export class ImageMetadataPipe implements PipeTransform {
  /**
   * Extracts metadata from an image file using sharp library,
   * and merges it with the original file object.
   *
   * @param file - The original file object.
   * @returns The merged file object with metadata.
   */
  async transform(file: Express.Multer.File): Promise<CombineFileShard> {
    const metadata = await sharp(file.buffer).metadata();
    return { ...file, ...metadata };
  }
}
