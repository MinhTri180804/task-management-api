import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvFilePath } from '@config/getEnvFilePath.config';
import databaseConfig from '@config/database.config';
import appConfig from '@config/app.config';
import { validateEnv } from '@config/env-validation.config';
import { MongoDatabaseSetupFactory } from '@setup/database/mongo.database.factory';
import { TodoModule } from '@modules/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      cache: true,
      load: [databaseConfig, appConfig],
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoDatabaseSetupFactory,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
