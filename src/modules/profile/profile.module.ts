import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessTokenStrategy } from '@shared/strategy/access-token.strategy';
import { ProfileModel } from './entity/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PROFILE_REPOSITORY_TOKEN } from './profile.token';
import { ProfileRepository } from './repository/profile.repository';

@Module({
  imports: [MongooseModule.forFeature([ProfileModel])],
  providers: [
    ProfileService,
    AccessTokenStrategy,
    {
      provide: PROFILE_REPOSITORY_TOKEN,
      useClass: ProfileRepository,
    },
  ],
  controllers: [ProfileController],
  exports: [MongooseModule, ProfileService],
})
export class ProfileModule {}
