import { UploadApiOptions, UploadApiResponse } from 'cloudinary';

export interface FileStoragePort {
  upload(buffer: Buffer, options: UploadApiOptions): Promise<UploadApiResponse>;
}
