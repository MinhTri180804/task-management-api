import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from '@shared/service/base/base.abstract.service';
import { User } from './entity/user.entity';
import { type IUserRepository } from './interface/user-repository.interface';

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
}
