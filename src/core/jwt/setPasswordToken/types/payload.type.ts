export type JwtSetPasswordTokenPayload = {
  email: string;
  sub: string;
  exp: number;
  iat: number;
};
