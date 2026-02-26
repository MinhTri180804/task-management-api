import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ERROR_CODE } from '@shared/constants/error-code.constant';
import { BaseServiceAbstract } from 'src/core/base/service/base.abstract.service';
import { BRAND_REPOSITORY } from './brand.tokens';
import { Brand } from './entity/brand.entity';
import { type IBrandRepository } from './interface/brand-repository.interface';

type FindByIdParams = { brandId: string };

@Injectable()
export class BrandService extends BaseServiceAbstract<Brand> {
  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly _brandRepository: IBrandRepository,
  ) {
    super(_brandRepository);
  }

  async findById({ brandId }: FindByIdParams) {
    const brand = await this._brandRepository.findOneById(brandId);
    if (!brand)
      throw new NotFoundException({
        message: 'Brand not found',
        errorCode: ERROR_CODE.BRAND_NOT_FOUND,
      });
    return brand;
  }
}
