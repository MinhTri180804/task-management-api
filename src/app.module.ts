import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './infrastructure/core.module';
import { ProfileModule } from '@modules/profile/profile.module';

@Module({
  imports: [CoreModule, AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
