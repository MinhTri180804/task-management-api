import { UploadApiOptions, UploadApiResponse } from 'cloudinary';

export interface FileStoragePort {
  upload({
    buffer,
    options,
  }: {
    buffer: Buffer;
    options: UploadApiOptions;
  }): Promise<UploadApiResponse>;
}
