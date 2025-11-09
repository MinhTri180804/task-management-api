import { BaseEntity } from 'src/core/base/entity/base.entity';
import { IBaseRepository } from 'src/core/base/repository/base.interface.repository';
import { FindAllResponse } from '@type/common.type';
import { IBaseService } from './base.interface.service';
import { HydratedDocument } from 'mongoose';

export class BaseServiceAbstract<T extends BaseEntity>
  implements IBaseService<T>
{
  constructor(
    private readonly _repository: IBaseRepository<T, HydratedDocument<T>>,
  ) {}

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<HydratedDocument<T>>> {
    return await this._repository.findAll(filter ?? {}, options);
  }

  async findOne(id: string): Promise<HydratedDocument<T> | null> {
    return await this._repository.findOneById(id);
  }

  async create(item: T): Promise<HydratedDocument<T>> {
    return await this._repository.create(item);
  }

  async update(
    id: string,
    item: Partial<T>,
  ): Promise<HydratedDocument<T> | null> {
    return await this._repository.update(id, item);
  }

  async softRemove(id: string): Promise<boolean> {
    return await this._repository.softDelete(id);
  }

  async permanentlyRemove(id: string): Promise<boolean> {
    return await this._repository.permanentlyDelete(id);
  }
}
