import { FileStorageModule } from '@core/fileStorage/file-storage.module';
import { AuthModule } from '@modules/auth/auth.module';
import { BrandModule } from '@modules/brand/brand.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './infrastructure/core.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    ProfileModule,
    BrandModule,

    // Global module
    FileStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
