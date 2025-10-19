import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModel } from './entity/profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [MongooseModule.forFeature([ProfileModel])],
  providers: [ProfileService],
  exports: [MongooseModule, ProfileService],
})
export class ProfileModule {}
