import { BaseRepositoryAbstract } from 'src/core/base/repository/base.abstract.repository';
import { Profile } from '../entity/profile.entity';
import { IProfileRepository } from '../interface/profile-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export class ProfileRepository
  extends BaseRepositoryAbstract<Profile>
  implements IProfileRepository
{
  constructor(
    @InjectModel(Profile.name) protected readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }

  async findByUserId({
    userId,
  }: {
    userId: Types.ObjectId;
  }): Promise<Profile | null> {
    return await this.profileModel.findOne({
      user_id: userId,
    });
  }
}
