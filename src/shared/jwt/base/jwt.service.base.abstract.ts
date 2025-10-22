import { IBaseServiceJwt } from './jwt.service.base.interface';
import { JwtService } from '@nestjs/jwt';

export abstract class BaseServiceJwtAbstract<T extends object, K>
  implements IBaseServiceJwt<T, K>
{
  protected constructor(protected readonly jwtService: JwtService) {}

  sign(payload: K): string {
    // TODO: Fix payload type
    return this.jwtService.sign(payload ? payload : {});
  }
  verify(token: string): T {
    return this.jwtService.verify<T>(token);
  }
  decode(token: string): T {
    return this.jwtService.decode(token);
  }
}
