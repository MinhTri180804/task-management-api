import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
  ) {}

  @Get()
  getHello(): string {
    console.log('123');
    return this.appService.getHello();
  }

  @Get('check-cache')
  async checkCache() {
    const value = await this._cacheManager.set('test2', 1);

    console.log('VALUE: ', value);
  }
}
