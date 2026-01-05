export interface ICacheService {
  getKeyWL(prefix: string): string;
  getKeyBL(prefix: string): string;

  onlyGetWL<T>(prefix: string): Promise<T>;
  onlyGetBL<T>(prefix: string): Promise<T>;

  set(prefix: string, ttl: number): Promise<void>;
  set<T>(prefix: string, ttl: number, payload: T): Promise<T | void>;

  onlySetWL(prefix: string, ttl: number): Promise<void>;
  onlySetWL<T, K = T>(prefix: string, ttl: number, payload: T): Promise<K>;

  onlySetBL(prefix: string, ttl: number): Promise<void>;
  onlySetBL<T, K = T>(prefix: string, ttl: number, payload: T): Promise<K>;

  exits(prefix: string): Promise<boolean>;
  exitsInWL(prefix: string): Promise<boolean>;
  existInBL(prefix: string): Promise<boolean>;

  revoke(prefix: string): Promise<void>;
  onlyRevokeInWL(prefix: string): Promise<void>;
  onlyRevokeInBL(prefix: string): Promise<void>;
}
