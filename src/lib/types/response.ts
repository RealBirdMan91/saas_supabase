export type ErrorType = {
  type: "error";
  message?: string;
};

export type SuccessType<T = object> = {
  type: "success";
  message?: string;
  data: T | null;
};

export type ActionResponseType<T = object> = SuccessType<T> | ErrorType;
