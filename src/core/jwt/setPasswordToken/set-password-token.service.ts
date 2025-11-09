import { Injectable } from '@nestjs/common';
import {
  IJwtSetPasswordTokenService,
  SignParams,
} from './interfaces/set-password.token-service.interface';
import { JwtService } from '@nestjs/jwt';
import { BaseServiceJwtAbstract } from '@shared/jwt/base/jwt.service.base.abstract';
import { JwtSetPasswordTokenPayload } from './types/payload.type';

@Injectable()
export class JwtSetPasswordTokenService
  extends BaseServiceJwtAbstract<JwtSetPasswordTokenPayload, SignParams>
  implements IJwtSetPasswordTokenService
{
  constructor(protected readonly jwtService: JwtService) {
    super(jwtService);
  }

  sign({ userId, email }: SignParams): string {
    return this.jwtService.sign({
      sub: userId,
      email: email,
    });
  }
}
