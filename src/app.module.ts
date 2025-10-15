import { ConfigModule } from '@modules/config/config.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@modules/cache/cache.module';
import { DatabaseModule } from '@modules/mongoose/mongoose.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
