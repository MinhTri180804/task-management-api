export type FindAllResponse<T> = {
  count: number;
  items: T[];
};

export type BaseErrorParamExceptionObject = {
  details?: object | Array<object>;
  message?: string;
};

export type BaseErrorParamException = BaseErrorParamExceptionObject | string;
