import { registerAs } from '@nestjs/config';

export const CloudinaryConfigName = 'cloudinary';

export interface CloudinaryConfig {
  apiKey: string;
  secretKey: string;
  cloudName: string;
}

export default registerAs(
  CloudinaryConfigName,
  (): CloudinaryConfig => ({
    apiKey: process.env.CLOUDINARY_API_KEY!,
    secretKey: process.env.CLOUDINARY_SECRET_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  }),
);
