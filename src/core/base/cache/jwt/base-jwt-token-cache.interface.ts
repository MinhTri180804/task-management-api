type SetParams = {
  tokenId: string;
};

type ExistParams = {
  tokenId: string;
};

type RevokeParams = {
  tokenId: string;
};

export interface IBaseJsonWebTokenCache {
  set(params: SetParams): Promise<void>;
  exist(params: ExistParams): Promise<boolean>;
  revoke(params: RevokeParams): Promise<void>;
}
