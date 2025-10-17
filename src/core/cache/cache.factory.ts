import { RedisConfig, RedisConfigName } from '@config/redis.config';
import KeyvRedis from '@keyv/redis';
import { CacheOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// const DEFAULT_TTL_SECOND = 60;

@Injectable()
export class CacheModuleFactory implements CacheOptionsFactory {
  private readonly logger = new Logger(KeyvRedis.name);

  constructor(private readonly _configService: ConfigService) {}

  private _emitListenEvent(redisStore: KeyvRedis<unknown>): void {
    redisStore.on('connect', () =>
      this.logger.log(`Redis connected successfully`),
    );

    // ...Addition more listen event in here
  }

  private async _pingTestConnection(
    redisStore: KeyvRedis<unknown>,
  ): Promise<void> {
    const KEY_PING_TEST = '__connection_test__';
    await redisStore.set(KEY_PING_TEST, 'ok');
    await redisStore.get(KEY_PING_TEST);
    await redisStore.delete(KEY_PING_TEST);
  }

  async createCacheOptions(): Promise<CacheOptions<Record<string, any>>> {
    const { host, port } =
      this._configService.getOrThrow<RedisConfig>(RedisConfigName);
    const url = `redis://${host}:${port}`;
    const redisStore = new KeyvRedis(url, {
      throwOnConnectError: true,
    });

    this._emitListenEvent(redisStore);
    await this._pingTestConnection(redisStore);
    return {
      stores: [redisStore],
      ttl: 10 * 1000,
    };
  }
}
