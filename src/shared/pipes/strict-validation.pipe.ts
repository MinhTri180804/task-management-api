import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationRequestException } from '@shared/exceptions/validation-request.exception';
import { cleanObject } from '@util/clean-object.util';

export class StrictValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (error) => {
        const detailsError = error.map((errorValue) => ({
          field: errorValue.property,
          message: Object.values(errorValue.constraints || {}),
        }));

        return new ValidationRequestException({ details: detailsError });
      },
    });
  }

  async transform(value: object, metadata: ArgumentMetadata) {
    const transformed = (await super.transform(value, metadata)) as object;

    if (
      !transformed ||
      typeof transformed !== 'object' ||
      Array.isArray(transformed)
    )
      return transformed as unknown[];

    const transformClean = cleanObject({ object: transformed });

    if (Object.keys(transformClean).length === 0) {
      throw new BadRequestException('Request body cannot be empty');
    }

    return transformed;
  }
}
