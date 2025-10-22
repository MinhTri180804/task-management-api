import { Module } from '@nestjs/common';
import { JWTInitProfileTokenService } from './init-profile.token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtInitProfileTokenFactory } from './init-profile-token.factory';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtInitProfileTokenFactory,
    }),
  ],
  providers: [JWTInitProfileTokenService],
  exports: [JWTInitProfileTokenService],
})
export class JwtInitProfileTokenModule {}
