import { RedisConfig, RedisConfigName } from '@config/redis.config';
import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageQueueSetupFactory
  implements SharedBullConfigurationFactory
{
  constructor(private readonly _configService: ConfigService) {}

  createSharedConfiguration():
    | Promise<BullRootModuleOptions>
    | BullRootModuleOptions {
    const { host, port } =
      this._configService.getOrThrow<RedisConfig>(RedisConfigName);
    return {
      connection: {
        host: host,
        port: port,
      },
    };
  }
}
