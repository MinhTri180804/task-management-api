import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NoneEmptyBodyPipe<T> implements PipeTransform<T> {
  transform(value: T) {
    console.log('VALUE: ', value);
    if (!value || Object.keys(value).length === 0) {
      throw new BadRequestException('Request body should not be empty');
    }

    return value;
  }
}
