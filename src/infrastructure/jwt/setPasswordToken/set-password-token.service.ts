import { Injectable } from '@nestjs/common';
import {
  IJwtSetPasswordTokenService,
  SignParams,
} from './interfaces/set-password-token-service.interface';
import { JwtService } from '@nestjs/jwt';
import { BaseServiceJwtAbstract } from 'src/core/base/jwt/jwt.service.base.abstract';
import { JwtSetPasswordTokenPayload } from './types/payload.type';
import { v4 as uuid } from 'uuid';

const INVALID_TOKEN_MESSAGE = 'Invalid set password token';

@Injectable()
export class JwtSetPasswordTokenService
  extends BaseServiceJwtAbstract<JwtSetPasswordTokenPayload, SignParams>
  implements IJwtSetPasswordTokenService
{
  constructor(protected readonly jwtService: JwtService) {
    super(jwtService, INVALID_TOKEN_MESSAGE);
  }

  sign({ userId, email }: SignParams): string {
    return this.jwtService.sign({
      sub: userId,
      email: email,
      jti: uuid(),
    });
  }
}
