import { JWTAccessTokenPayload } from '@core/jwt/accessToken/types/payload.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (key: keyof JWTAccessTokenPayload, ctx: ExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = request.user as JWTAccessTokenPayload;
    return user[key];
  },
);
