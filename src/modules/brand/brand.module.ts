import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenStrategy } from '@shared/strategy/access-token.strategy';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BRAND_REPOSITORY } from './brand.tokens';
import { BrandModel } from './entity/brand.entity';
import { BrandRepository } from './repository/brand.repository';

@Module({
  imports: [MongooseModule.forFeature([BrandModel])],
  controllers: [BrandController],
  providers: [
    BrandService,
    AccessTokenStrategy,
    {
      provide: BRAND_REPOSITORY,
      useClass: BrandRepository,
    },
  ],
  exports: [],
})
export class BrandModule {}
