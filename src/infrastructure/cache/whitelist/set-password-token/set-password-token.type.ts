// === Params Method
export type GetKeyParams = { userId: string };
export type GetParams = { userId: string };

// ttl in ms
export type SaveParams = { userId: string; token: string };
export type DeleteParams = { userId: string };

// === Returns method
export type GetReturn = { token: string } | undefined;
export type SaveReturn = {
  expiresAt: number;
};
export type DeleteReturn = boolean;

// === Payload
export type Payload = { token: string };
