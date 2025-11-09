import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserSchemaFactory } from './entity/user-schema.factory';

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
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [UserController],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
