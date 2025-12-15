import { SetPasswordTokenCacheWhiteListModule } from '@core/cache/whitelist/set-password-token/set-password-token.module';
import { JwtSetPasswordTokenModule } from '@infrastructure/jwt/setPasswordToken/set-password.token.module';
import { SendMailQueueModule } from '@infrastructure/messageQueue/queues/sendMail/send-mail.queue.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthLocalController } from './local.controller';
import { AuthLocalService } from './local.service';
import { VerifyEmailRegisterCacheWhiteListModule } from '@core/cache/whitelist/verify-email-register/verify-email-register.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthStrategy } from './local.strategy';
import { JwtAccessTokenModule } from '@core/jwt/accessToken/access-token.module';
import { JWTRefreshTokenModule } from '@core/jwt/refreshToken/refresh-token.module';

@Module({
  imports: [
    SendMailQueueModule,
    UserModule,
    JwtSetPasswordTokenModule,
    JwtAccessTokenModule,
    JWTRefreshTokenModule,
    SetPasswordTokenCacheWhiteListModule,
    VerifyEmailRegisterCacheWhiteListModule,
    PassportModule,
  ],
  controllers: [AuthLocalController],
  providers: [AuthLocalService, LocalAuthStrategy],
  exports: [],
})
export class AuthLocalModule {}
