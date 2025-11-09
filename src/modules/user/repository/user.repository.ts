import { BaseRepositoryAbstract } from 'src/core/base/repository/base.abstract.repository';
import { User } from '../entity/user.entity';
import {
  FindUserByEmailPrams,
  IUserRepository,
} from '../interface/user-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements IUserRepository
{
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {
    super(_userModel);
  }

  async findUserByEmail({ email }: FindUserByEmailPrams) {
    return await this._userModel
      .findOne({
        email,
      })
      .exec();
  }
}
