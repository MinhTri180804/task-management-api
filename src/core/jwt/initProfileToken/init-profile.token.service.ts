import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseServiceJwtAbstract } from '@shared/jwt/base/jwt.service.base.abstract';
import {
  IJwtInitProfileTokenService,
  SignParams,
} from './interface/init-profile-token-service.interface';
import { JwtInitProfileTokenPayload } from './type/payload.type';

@Injectable()
export class JWTInitProfileTokenService
  extends BaseServiceJwtAbstract<JwtInitProfileTokenPayload, SignParams>
  implements IJwtInitProfileTokenService
{
  constructor(protected readonly jwtService: JwtService) {
    super(jwtService);
  }
}
