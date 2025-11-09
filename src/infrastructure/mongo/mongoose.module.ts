import { ConfigModule } from '@infrastructure/config/config.module';
import { MongoDatabaseSetupFactory } from '@infrastructure/mongo/mongo.database.factory';
import { Module } from '@nestjs/common';
import { MongooseModule as MongooseModuleNestjs } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModuleNestjs.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoDatabaseSetupFactory,
    }),
  ],
})
export class MongoModule {}
