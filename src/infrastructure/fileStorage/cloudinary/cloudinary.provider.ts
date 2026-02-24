import { Provider } from '@nestjs/common';
import { CLOUDINARY_ADAPTER_TOKEN } from '../file-storage.token';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import {
  CloudinaryConfig,
  CloudinaryConfigName,
} from '@config/cloudinary.config';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY_ADAPTER_TOKEN,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { apiKey, secretKey, cloudName } =
      configService.getOrThrow<CloudinaryConfig>(CloudinaryConfigName);

    cloudinary.config({
      api_key: apiKey,
      api_secret: secretKey,
      cloud_name: cloudName,
    });

    return cloudinary;
  },
};
