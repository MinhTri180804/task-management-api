import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtSetPasswordTokenFactory } from './set-password-token.factory';
import { ConfigService } from '@nestjs/config';
import { JwtSetPasswordTokenService } from './set-password-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtSetPasswordTokenFactory,
    }),
  ],
  providers: [JwtSetPasswordTokenService],
  exports: [JwtSetPasswordTokenService],
})
export class JwtSetPasswordTokenModule {}
