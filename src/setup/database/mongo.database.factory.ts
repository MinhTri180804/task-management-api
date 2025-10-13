import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppConfigName, type AppConfig } from 'src/config/app.config';
import { DatabaseConfig, DatabaseConfigName } from 'src/config/database.config';

@Injectable()
export class MongoDatabaseSetupFactory implements MongooseOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    const dbConfig =
      this._configService.getOrThrow<DatabaseConfig>(DatabaseConfigName);

    const { host, name, port } = dbConfig;

    const uri = `mongodb://${host}:${port}/${name}`;

    const appConfig = this._configService.getOrThrow<AppConfig>(AppConfigName);

    if (appConfig.nodeEnv === 'development') mongoose.set({ debug: true });

    Logger.debug('Database URI: ' + uri);

    return {
      uri,
      autoIndex: true,
    };
  }
}
