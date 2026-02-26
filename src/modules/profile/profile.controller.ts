import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';
import { ResponseSuccessStatus } from '@shared/decorators/response-success-status.decorator';
import { AccessTokenGuard } from '@shared/guard/access-token.guard';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateUserProfileDTO } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageAvatarValidationPipe } from './pipe/image-avatar-validation.pipe';
import { ImageMetadataPipe } from '@shared/pipes/image-metadata.pipe';
import { type CombineFileShard } from '@shared/types/combine-file-sharp.type';
import { Types } from 'mongoose';

@Controller('profile')
export class ProfileController {
  constructor(private readonly _profileService: ProfileService) {}

  @Get('me')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessStatus(HttpStatus.OK)
  @ResponseSuccessMessage('Get me profile successfully')
  async getMe(@CurrentUser('sub') userId: string) {
    const userProfile = await this._profileService.getMe({ userId });
    return userProfile;
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Init profile successfully')
  @ResponseSuccessStatus(HttpStatus.CREATED)
  async init(
    @CurrentUser('sub') userId: string,
    @Body() data: CreateProfileDTO,
  ) {
    const userProfile = await this._profileService.init({
      userId,
      nickname: data.nickname,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
    });
    return userProfile;
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Update profile successfully')
  @ResponseSuccessStatus(HttpStatus.OK)
  async update(
    @CurrentUser('sub') userId: string,
    @Body() data: UpdateUserProfileDTO,
  ) {
    const newUserProfile = await this._profileService.update({
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
    });

    return newUserProfile;
  }

  @Post('upload-avatar')
  @UseGuards(AccessTokenGuard)
  @ResponseSuccessMessage('Upload avatar successfully')
  @ResponseSuccessStatus(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile(new ImageMetadataPipe(), new ImageAvatarValidationPipe(true))
    avatar: CombineFileShard,

    @CurrentUser('sub') userId: string,
  ) {
    const { publicId, secureUrl } = await this._profileService.uploadAvatar({
      avatarBuffer: avatar.buffer,
      userId: new Types.ObjectId(userId),
    });

    return { publicId, secureUrl };
  }
}
