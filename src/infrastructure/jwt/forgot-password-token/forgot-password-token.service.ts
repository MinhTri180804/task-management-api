import { BaseServiceJwtAbstract } from 'src/core/base/jwt/jwt.service.base.abstract';
import { JwtForgotPasswordTokenPayload } from './types/payload.type';
import {
  IJwtForgotPasswordTokenService,
  SignParams,
} from './interface/forgot-password-token-service.interface';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

const INVALID_MESSAGE = 'Forgot password token invalid';

@Injectable()
export class JWTForgotPasswordTokenService
  extends BaseServiceJwtAbstract<JwtForgotPasswordTokenPayload, SignParams>
  implements IJwtForgotPasswordTokenService
{
  constructor(protected readonly _jwtService: JwtService) {
    super(_jwtService, INVALID_MESSAGE);
  }
  sign({ userId, email }: SignParams): string {
    return this._jwtService.sign({ sub: userId, email: email, jti: uuid() });
  }
}
