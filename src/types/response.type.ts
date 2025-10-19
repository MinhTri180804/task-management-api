export type ApiResponseSuccess<T> = {
  isSuccess: boolean;
  statusCode: number;
  data: T | null;
  message: string | null;
};

export type ApiResponseError = {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  details: object | string | null;
  cause?: any;
};
