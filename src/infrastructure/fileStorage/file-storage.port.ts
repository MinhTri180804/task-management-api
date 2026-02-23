import { UploadApiResponse } from 'cloudinary';

export interface FileStoragePort {
  upload(buffer: Buffer, folder: string): Promise<UploadApiResponse>;
}
