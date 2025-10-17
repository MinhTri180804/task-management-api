import { ConfigModule } from '@modules/config/config.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@modules/cache/cache.module';
import { DatabaseModule } from '@modules/mongoose/mongoose.module';
import { MailModule } from '@modules/mail/mail.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, CacheModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
