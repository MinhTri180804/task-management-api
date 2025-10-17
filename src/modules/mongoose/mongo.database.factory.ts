import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppConfigName, type AppConfig } from 'src/config/app.config';
import {
  DatabaseConfigName,
  type DatabaseConfig,
} from 'src/config/database.config';

@Injectable()
export class MongoDatabaseSetupFactory implements MongooseOptionsFactory {
  private readonly _DEFAULT_SELECTION_TIMEOUT = 60; // Second value
  private readonly _DEFAULT_SOCKET_TIMEOUT = 120; // Second value
  private readonly _DEFAULT_AUTO_INDEX = true;

  constructor(private readonly _configService: ConfigService) {}

  // TODO: Fix show log related connection mongodb later in here

  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    const dbConfig =
      this._configService.getOrThrow<DatabaseConfig>(DatabaseConfigName);

    const { host, name, port } = dbConfig;

    const uri = `mongodb://${host}:${port}/${name}`;

    const appConfig = this._configService.getOrThrow<AppConfig>(AppConfigName);

    if (appConfig.nodeEnv === 'development') mongoose.set({ debug: true });

    return {
      uri: uri,
      autoIndex: this._DEFAULT_AUTO_INDEX,
      serverSelectionTimeoutMS: this._DEFAULT_SELECTION_TIMEOUT,
      socketTimeoutMS: this._DEFAULT_SOCKET_TIMEOUT,
    };
  }
}
