import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/base/service/base.abstract.service';
import { User } from './entity/user.entity';
import { type IUserRepository } from './interface/user-repository.interface';
import { HydratedDocument } from 'mongoose';

type FindByEmailParams = { email: string };

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
  ) {
    super(_userRepository);
  }

  async findByEmail({ email }: FindByEmailParams): Promise<User | null> {
    return await this._userRepository.findUserByEmail({ email });
  }

  async setPassword(user: HydratedDocument<User>, password: string) {
    user.password = password;
    await user.save();
  }
}
