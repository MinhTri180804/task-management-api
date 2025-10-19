import { Module } from '@nestjs/common';
import { OAuthProviderService } from './oauthProvider.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OAuthProviderModel } from './entity/oauth-provider.entity';

@Module({
  imports: [MongooseModule.forFeature([OAuthProviderModel])],
  providers: [OAuthProviderService],
  exports: [MongooseModule, OAuthProviderService],
})
export class OAuthProviderModule {}
