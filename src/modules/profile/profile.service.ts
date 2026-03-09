import { type FileStoragePort } from '@infrastructure/fileStorage/file-storage.port';
import { FILE_STORAGE_TOKEN } from '@infrastructure/fileStorage/file-storage.token';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserProfileExistException } from '@shared/exceptions/profile-exist.exception';
import { UserProfileNotExistException } from '@shared/exceptions/profile-not-exist.exception';
import { removeUndefined } from '@shared/utils/remove-undefined.util';
import { Types } from 'mongoose';
import { type IProfileRepository } from './interface/profile-repository.interface';
import { PROFILE_REPOSITORY_TOKEN } from './profile.token';
import { ERROR_CODE } from '@shared/constants/error-code.constant';

// TODO: Update replace avatar to avatar_public_id and avatar_secure_url
type InitParams = {
  userId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatar?: string;
};

type GetMeParams = {
  userId: string;
};

// TODO: Remove avatar field in api update profile
type UpdateParams = {
  userId: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
};

type UploadAvatarParams = {
  avatarBuffer: Buffer;
  userId: Types.ObjectId;
};

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY_TOKEN)
    private _profileRepository: IProfileRepository,

    @Inject(FILE_STORAGE_TOKEN)
    private _fileStorageService: FileStoragePort,
  ) {}

  async init({ userId, firstName, lastName, avatar, nickname }: InitParams) {
    const profileByUserId = await this._profileRepository.findByUserId({
      userId: new Types.ObjectId(userId),
    });

    if (profileByUserId) throw new UserProfileExistException({});

    const userProfile = await this._profileRepository.create({
      user_id: new Types.ObjectId(userId),
      nickname: nickname,
      first_name: firstName,
      last_name: lastName,
      avatar_public_id: avatar,
    });

    return userProfile;
  }

  async getMe({ userId }: GetMeParams) {
    const userProfile = await this._profileRepository.findByUserId({
      userId: new Types.ObjectId(userId),
    });
    if (!userProfile)
      throw new UserProfileNotExistException({
        errorCode: ERROR_CODE.PROFILE_NOT_INITIALIZED,
      });

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
        avatar_public_id: updateData.avatar,
      },
    });

    return userProfile;
  }

  async uploadAvatar({ avatarBuffer: fileBuffer, userId }: UploadAvatarParams) {
    const { public_id, secure_url } = await this._fileStorageService.upload({
      buffer: fileBuffer,
      options: {
        public_id: `users/avatar/${userId}`,
        overwrite: true,
        unique_filename: true,
        resource_type: 'image',
        transformation: {
          width: 300,
          height: 300,
          crop: 'fill',
          quality: 'auto',
        },
        format: 'webp',
      },
    });

    await this._profileRepository.updateByUserId({
      userId,
      updateData: {
        avatar_public_id: public_id,
        avatar_secure_url: secure_url,
      },
    });

    return { publicId: public_id, secureUrl: secure_url };
  }
}
