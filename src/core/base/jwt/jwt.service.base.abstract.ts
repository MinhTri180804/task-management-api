import { TokenInvalidException } from '@shared/exceptions/token-invalid.exception';
import { IBaseServiceJwt } from './jwt.service.base.interface';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';

export abstract class BaseServiceJwtAbstract<T extends object, K>
  implements IBaseServiceJwt<T, K>
{
  protected constructor(
    protected readonly jwtService: JwtService,
    protected readonly invalidTokenMessage: string,
  ) {}

  sign(payload: K): string {
    // TODO: Fix payload type
    return this.jwtService.sign(payload ? payload : {});
  }
  verify(token: string): T {
    try {
      return this.jwtService.verify<T>(token);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new TokenInvalidException({ message: this.invalidTokenMessage });
      }

      throw error;
    }
  }
  decode(token: string): T {
    return this.jwtService.decode(token);
  }
}
