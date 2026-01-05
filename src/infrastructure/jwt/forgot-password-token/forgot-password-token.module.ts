import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtForgotPasswordTokenFactory } from './forgot-password-token.factory';
import { JWTForgotPasswordTokenService } from './forgot-password-token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useClass: JwtForgotPasswordTokenFactory,
    }),
  ],
  providers: [JWTForgotPasswordTokenService],
  exports: [JWTForgotPasswordTokenService],
})
export class JwtForgotPasswordTokenModule {}
