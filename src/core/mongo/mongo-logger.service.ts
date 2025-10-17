import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoModule } from './mongoose.module';

@Injectable()
export class MongoLoggerService implements OnModuleInit {
  private readonly _logger = new Logger(MongoModule.name);

  constructor(@InjectConnection() private readonly _connection: Connection) {}
  onModuleInit() {
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
}
