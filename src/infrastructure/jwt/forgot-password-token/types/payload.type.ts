export type JwtForgotPasswordTokenPayload = {
  email: string;
  sub: string;
  exp: number;
  iat: number;
  jti: string;
};
