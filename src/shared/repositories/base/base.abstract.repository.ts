import { BaseEntity } from '@shared/entities/base/base.entity';
import { IBaseRepository } from './base.interface.repository';
import { FindAllResponse } from 'src/types/common.type';
import { FilterQuery, HydratedDocument, Model, QueryOptions } from 'mongoose';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
  implements IBaseRepository<HydratedDocument<T>>
{
  protected constructor(private readonly _model: Model<T>) {
    this._model = _model;
  }

  async create<K = T>(dto: K): Promise<HydratedDocument<T>> {
    const createData = await this._model.create(dto);
    return createData.save();
  }

  async findOneById(id: string): Promise<HydratedDocument<T> | null> {
    const item = await this._model.findById(id);
    return item?.deleted_at ? null : item;
  }

  async findOneByCondition(
    condition = {},
  ): Promise<HydratedDocument<T> | null> {
    const item = await this._model
      .findOne({
        ...condition,
        deleted_at: null,
      })
      .exec();

    if (!item) return null;
    return item;
  }

  async findAll(
    condition: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<FindAllResponse<HydratedDocument<T>>> {
    const [count, items] = await Promise.all([
      this._model.countDocuments({ ...condition, deleted_at: null }),
      this._model.find(
        { ...condition, deleted_at: null },
        options?.projection,
        options,
      ),
    ]);

    return {
      count,
      items,
    };
  }

  async update(
    id: string,
    dto: Partial<T>,
  ): Promise<HydratedDocument<T> | null> {
    const item = await this._model.findByIdAndUpdate(
      { _id: id, deleted_at: null },
      dto,
      { new: true },
    );

    if (!item) return null;
    return item;
  }

  async softDelete(id: string): Promise<boolean> {
    const delete_item = await this._model.findById(id);

    if (!delete_item) return false;

    return !!(await this._model
      .findByIdAndUpdate(id, {
        deleted_at: new Date(),
      })
      .exec());
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const delete_item = await this._model.findById(id);

    if (!delete_item) return false;

    return !!(await this._model.findByIdAndDelete(id));
  }
}
