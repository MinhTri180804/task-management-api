import { IBaseRepository } from 'src/core/base/repository/base.interface.repository';
import { User } from '../entity/user.entity';
import { HydratedDocument } from 'mongoose';

export type FindUserByEmailPrams = { email: string };

export interface IUserRepository
  extends IBaseRepository<User, HydratedDocument<User>> {
  findUserByEmail(params: FindUserByEmailPrams): Promise<User | null>;
}
