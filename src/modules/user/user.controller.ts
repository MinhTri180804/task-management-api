import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}
  @Get()
  getAll() {
    return 'This is user controller';
  }
}
