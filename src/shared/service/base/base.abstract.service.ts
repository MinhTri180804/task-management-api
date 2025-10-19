import { BaseEntity } from '@shared/entities/base/base.entity';
import { IBaseRepository } from '@shared/repositories/base/base.interface.repository';
import { FindAllResponse } from '@type/common.type';
import { IBaseService } from './base.interface.service';

export class BaseServiceAbstract<T extends BaseEntity>
  implements IBaseService<T>
{
  constructor(private readonly _repository: IBaseRepository<T>) {}

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<T>> {
    return await this._repository.findAll(filter ?? {}, options);
  }

  async findOne(id: string): Promise<T | null> {
    return await this._repository.findOneById(id);
  }

  async create(item: T): Promise<T> {
    return await this._repository.create(item);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return await this._repository.update(id, item);
  }

  async softRemove(id: string): Promise<boolean> {
    return await this._repository.softDelete(id);
  }

  async permanentlyRemove(id: string): Promise<boolean> {
    return await this._repository.permanentlyDelete(id);
  }
}
