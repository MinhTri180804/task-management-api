// T params type of method getKey
// J params type of method get
// K params type of method set
// L params type of method del

// M return type of method get
// N return type of method set

export interface IBaseServiceCache<T, J, K, L, M, N> {
  getKey(params: T): string;
  get(params: J): Promise<M | undefined>;
  set(params: K): Promise<N>;
  del(params: L): Promise<boolean>;
}
