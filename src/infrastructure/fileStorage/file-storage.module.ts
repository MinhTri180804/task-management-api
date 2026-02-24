import { Global, Module } from '@nestjs/common';
import { FILE_STORAGE_TOKEN } from './file-storage.token';
import { CloudinaryAdapter } from './cloudinary/cloudinary.adapter';
import { CloudinaryProvider } from './cloudinary/cloudinary.provider';

@Global()
@Module({
  providers: [
    {
      provide: FILE_STORAGE_TOKEN,
      useClass: CloudinaryAdapter,
    },
    CloudinaryProvider,
  ],
  exports: [FILE_STORAGE_TOKEN],
})
export class FileStorageModule {}
