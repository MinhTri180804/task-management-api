// T Payload type
// K Sign params type
export interface IBaseServiceJwt<T, K> {
  sign(payload: K): string;

  verify(token: string): T;

  decode(token: string): T;
}
