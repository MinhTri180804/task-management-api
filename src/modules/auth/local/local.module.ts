import { SetPasswordTokenCacheModule } from '@infrastructure/cache/set-password-token/set-password-token.module';
import { JwtSetPasswordTokenModule } from '@infrastructure/jwt/setPasswordToken/set-password.token.module';
import { SendMailQueueModule } from '@infrastructure/messageQueue/queues/sendMail/send-mail.queue.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthLocalController } from './local.controller';
import { AuthLocalService } from './local.service';
import { VerifyEmailRegisterCacheModule } from '@infrastructure/cache/verify-email-register/verify-email-register.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local.strategy';
import { JwtAccessTokenModule } from '@infrastructure/jwt/accessToken/access-token.module';
import { JWTRefreshTokenModule } from '@infrastructure/jwt/refreshToken/refresh-token.module';
import { JwtForgotPasswordTokenModule } from '@infrastructure/jwt/forgot-password-token/forgot-password-token.module';
import { ForgotPasswordTokenCacheModule } from '@infrastructure/cache/forgot-password-token/forgot-password-token.module';
import { ConfigModule } from '@infrastructure/config/config.module';

@Module({
  imports: [
    SendMailQueueModule,
    UserModule,
    JwtSetPasswordTokenModule,
    JwtAccessTokenModule,
    JWTRefreshTokenModule,
    SetPasswordTokenCacheModule,
    VerifyEmailRegisterCacheModule,
    JwtForgotPasswordTokenModule,
    ForgotPasswordTokenCacheModule,
    PassportModule,
  ],
  controllers: [AuthLocalController],
  providers: [AuthLocalService, LocalAuthStrategy],
  exports: [],
})
export class AuthLocalModule {}
