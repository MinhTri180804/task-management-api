import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaFactory } from './entity/user-schema.factory';
import { UserModel } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_REPOSITORY } from './user.tokens';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        useFactory: UserSchemaFactory,
        name: UserModel.name,
        inject: [],
      },
    ]),
  ],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
