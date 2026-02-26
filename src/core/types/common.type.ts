import { ErrorCodeValues } from '@shared/constants/error-code.constant';

export type FindAllResponse<T> = {
  count: number;
  items: T[];
};

export type BaseErrorParamExceptionObject = {
  details?: object | Array<object>;
  message?: string;
  errorCode?: ErrorCodeValues;
};

export type BaseErrorParamException = BaseErrorParamExceptionObject | string;
