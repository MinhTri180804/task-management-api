import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

export class StrictValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }

  async transform(value: object, metadata: ArgumentMetadata) {
    const transformed = (await super.transform(value, metadata)) as object;

    if (
      !transformed ||
      typeof transformed !== 'object' ||
      Array.isArray(transformed)
    )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return transformed;

    for (const key of Object.keys(transformed)) {
      if (transformed[key] === undefined) {
        delete transformed[key];
      }
    }

    if (Object.keys(transformed).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }

    return transformed;
  }
}
