import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JWTRefreshTokenFactory } from './refresh-token.factory';
import { JWTRefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JWTRefreshTokenFactory,
    }),
  ],
  providers: [JWTRefreshTokenService],
  exports: [JWTRefreshTokenService],
})
export class JWTRefreshTokenModule {}
