import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './entity/user.entity';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
