import { Module } from '@nestjs/common';
import { JWTAccessTokenService } from './access-token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessTokenFactory } from './access-token.factory';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtAccessTokenFactory,
    }),
  ],
  providers: [JWTAccessTokenService],
  exports: [JWTAccessTokenService],
})
export class JwtAccessTokenModule {}
