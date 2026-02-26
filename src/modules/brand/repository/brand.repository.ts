import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/core/base/repository/base.abstract.repository';
import { Brand } from '../entity/brand.entity';
import { IBrandRepository } from '../interface/brand-repository.interface';

@Injectable()
export class BrandRepository
  extends BaseRepositoryAbstract<Brand>
  implements IBrandRepository
{
  constructor(
    @InjectModel(Brand.name) private readonly _brandModel: Model<Brand>,
  ) {
    super(_brandModel);
  }
}
