// Params Types
export type GetKeyParams = {
  email: string;
};

export type GetParams = {
  email: string;
};

export type SaveParams = {
  email: string;
  otp: string;
};

export type DeleteParams = {
  email: string;
};

// Return Types

export type GetReturn = {
  otp: string;
  createdAt: number;
};

export type SaveReturn = {
  expiredAt: Date;
};

// Payload
export type Payload = {
  otp: string;
  createdAt: number;
};
