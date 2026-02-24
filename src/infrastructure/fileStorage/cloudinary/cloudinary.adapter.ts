import { Injectable } from '@nestjs/common';
import { FileStoragePort } from '../file-storage.port';
import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryAdapter implements FileStoragePort {
  private readonly _cloudinary: typeof cloudinary;
  constructor(private readonly _configService: ConfigService) {}

  async upload({
    buffer,
    options,
  }: {
    buffer: Buffer;
    options: UploadApiOptions;
  }): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) reject(error);
          resolve(result!);
        },
      );

      stream.end(buffer);
    });
  }
}
