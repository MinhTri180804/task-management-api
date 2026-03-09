import { User } from '@modules/user/entity/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type RequestWithUser = Request & {
  user: Omit<User, 'password'>;
};

/**
 * Custom parameter decorator to retrieve the authenticated user
 * attached to the request object by Passport.
 *
 * This decorator is typically used in route handlers protected by
 * authentication guards (e.g., JWT guard) to access the current user.
 */
export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
});
