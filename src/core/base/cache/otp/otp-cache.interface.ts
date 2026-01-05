export interface IBaseOtpCache {
  get<T>({ email }: { email: string }): Promise<T | undefined>;
  set<T>({ email, otp }: { email: string; otp: string }): Promise<T>;
  exist({ email }: { email: string }): Promise<boolean>;
  revoke({ email }: { email: string }): Promise<void>;
  isMatch({ email, otp }: { email: string; otp: string }): Promise<boolean>;
}
