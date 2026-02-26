import { IBaseRepository } from 'src/core/base/repository/base.interface.repository';
import { Brand, BrandDocument } from '../entity/brand.entity';

export interface IBrandRepository extends IBaseRepository<
  Brand,
  BrandDocument
> {}
