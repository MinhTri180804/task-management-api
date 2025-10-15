import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  InjectConnection,
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';
import { AppConfigName, type AppConfig } from 'src/config/app.config';
import {
  DatabaseConfigName,
  type DatabaseConfig,
} from 'src/config/database.config';
import { DatabaseModule } from './mongoose.module';

@Injectable()
export class MongoDatabaseSetupFactory implements MongooseOptionsFactory {
  private readonly _DEFAULT_SELECTION_TIMEOUT = 60; // Second value
  private readonly _DEFAULT_SOCKET_TIMEOUT = 120; // Second value
  private readonly _DEFAULT_AUTO_INDEX = true;
  private readonly _logger = new Logger(DatabaseModule.name);

  constructor(
    private readonly _configService: ConfigService,
    @InjectConnection() private readonly _connection: Connection,
  ) {}

  // TODO: Fix show log related connection mongodb later in here
  private _emitEventListenConnection() {
    this._connection.on('connected', () =>
      this._logger.log('✅ MongoDB connected successfully'),
    );
    this._connection.on('error', (err) =>
      this._logger.error('❌ MongoDB connection error', err),
    );
    this._connection.on('disconnected', () =>
      this._logger.warn('⚠️ MongoDB disconnected'),
    );
    this._connection.on('reconnected', () =>
      this._logger.log('🔄 MongoDB reconnected'),
    );
  }

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
