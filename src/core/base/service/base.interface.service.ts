import { FindAllResponse } from 'src/core/types/common.type';

export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  softRemove(id: string): Promise<boolean>;
  permanentlyRemove(id: string): Promise<boolean>;
}

export interface IRead<T> {
  findAll(filter?: object, options?: object): Promise<FindAllResponse<T>>;
  findOne(id: string): Promise<T | null>;
}

export interface IBaseService<T> extends IRead<T>, IWrite<T> {}
