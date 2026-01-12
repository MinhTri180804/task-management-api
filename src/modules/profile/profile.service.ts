import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PROFILE_REPOSITORY_TOKEN } from './profile.token';
import { type IProfileRepository } from './interface/profile-repository.interface';
import { UserProfileExistException } from '@shared/exceptions/profile-exist.exception';
import { Types } from 'mongoose';
import { UserProfileNotExistException } from '@shared/exceptions/profile-not-exist.exception';
import { removeUndefined } from '@shared/utils/remove-undefined.util';

type InitParams = {
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

type GetMeParams = {
  userId: string;
};

type UpdateParams = {
  userId: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY_TOKEN)
    private _profileRepository: IProfileRepository,
  ) {}

  async init({ userId, firstName, lastName, avatar }: InitParams) {
    const profileByUserId = await this._profileRepository.findByUserId({
      userId: new Types.ObjectId(userId),
    });

    if (profileByUserId) throw new UserProfileExistException({});

    const userProfile = await this._profileRepository.create({
      user_id: new Types.ObjectId(userId),
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatar,
    });

    return userProfile;
  }

  async getMe({ userId }: GetMeParams) {
    const userProfile = await this._profileRepository.findByUserId({
      userId: new Types.ObjectId(userId),
    });
    if (!userProfile) throw new UserProfileNotExistException({});

    return userProfile;
  }

  async update({ userId, firstName, lastName, avatar }: UpdateParams) {
    const updateData = removeUndefined({
      firstName,
      lastName,
      avatar,
    });

    if (Object.entries(updateData).length === 0)
      throw new BadRequestException({});

    const userProfile = await this._profileRepository.updateByUserId({
      userId: new Types.ObjectId(userId),
      updateData: {
        first_name: updateData.firstName,
        last_name: updateData.lastName,
        avatar_url: updateData.avatar,
      },
    });

    return userProfile;
  }
}
