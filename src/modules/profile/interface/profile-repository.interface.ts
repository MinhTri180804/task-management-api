import { IBaseRepository } from 'src/core/base/repository/base.interface.repository';
import { Profile } from '../entity/profile.entity';
import { HydratedDocument, Types } from 'mongoose';

export interface IProfileRepository
  extends IBaseRepository<Profile, HydratedDocument<Profile>> {
  findByUserId({ userId }: { userId: Types.ObjectId }): Promise<Profile | null>;
  updateByUserId({
    userId,
    updateData,
  }: {
    userId: Types.ObjectId;
    updateData: Partial<HydratedDocument<Profile>>;
  }): Promise<Profile | null>;
}
