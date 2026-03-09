import { JWTAccessTokenPayload } from '@infrastructure/jwt/accessToken/types/payload.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * A custom decorator that retrieves the payload of the current access token
 * from the request object and returns the specified property of the payload.
 *
 * @param {keyof JWTAccessTokenPayload} key - The property of the payload to retrieve.
 * @param {ExecutionContext} ctx - The execution context.
 * @returns {JWTAccessTokenPayload[keyof JWTAccessTokenPayload]} - The value of the specified property in the payload.
 */
export const CurrentAccessTokenPayload = createParamDecorator(
  (key: keyof JWTAccessTokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JWTAccessTokenPayload;
    return user[key];
  },
);
