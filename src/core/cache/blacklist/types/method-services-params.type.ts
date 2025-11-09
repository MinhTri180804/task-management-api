// ====== PRIVATE METHOD ======
export type getKeySetPasswordParams = {
  email: string;
};

// ====== PUBLIC METHOD ======
export type GetSetPasswordParams = {
  email: string;
};

export type SaveSetPasswordParams = {
  email: string;
  token: string;
};

export type DeleteSetPasswordParams = {
  email: string;
};
