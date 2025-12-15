import { User } from '@modules/user/entity/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthLocalService } from './local.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authLocalService: AuthLocalService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this._authLocalService.validate({ email, password });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
