import { FindAllResponse } from 'src/types/common.type';

export interface IBaseRepository<T, K = T> {
  create(dto: T): Promise<K>;

  findOneById(id: string, projection?: string): Promise<K | null>;

  findOneByCondition(
    condition?: object,
    projection?: string,
  ): Promise<K | null>;

  findAll(condition: object, options?: object): Promise<FindAllResponse<K>>;

  update(id: string, dto: Partial<T>): Promise<K | null>;

  softDelete(id: string): Promise<boolean>;

  permanentlyDelete(id: string): Promise<boolean>;
}
