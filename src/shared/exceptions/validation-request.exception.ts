import { HttpException, HttpStatus } from '@nestjs/common';

type ConstructorParams = {
  message?: string;
  details: {
    field: string;
    message: string[];
  }[];
};

export class ValidationRequestException extends HttpException {
  constructor(params: ConstructorParams) {
    super({ ...params }, HttpStatus.BAD_REQUEST);
  }
}
