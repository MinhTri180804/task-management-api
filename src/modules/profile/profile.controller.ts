import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { ResponseSuccessMessage } from '@shared/decorators/response-success-message.decorator';
import { ResponseSuccessStatus } from '@shared/decorators/response-success-status.decorator';
import { AccessTokenGuard } from '@shared/guard/access-token.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDTO } from './dto/create-profile.dto';

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
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
    });
    return userProfile;
  }
}
