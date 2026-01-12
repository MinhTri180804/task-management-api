import { BaseRepositoryAbstract } from 'src/core/base/repository/base.abstract.repository';
import { Profile } from '../entity/profile.entity';
import { IProfileRepository } from '../interface/profile-repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Document, HydratedDocument, Model, Types } from 'mongoose';

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

  async updateByUserId({
    userId,
    updateData,
  }: {
    userId: Types.ObjectId;
    updateData: Partial<HydratedDocument<Profile>>;
  }): Promise<Profile | null> {
    return await this.profileModel.findOneAndUpdate(
      {
        user_id: userId,
      },
      { $set: updateData },
      {
        new: true,
      },
    );
  }
}
