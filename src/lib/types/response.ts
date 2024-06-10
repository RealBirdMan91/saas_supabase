export type ErrorType<E = object> = {
  type: "error";
  message?: string;
  error: E | null;
};

export type SuccessType<T = object> = {
  type: "success";
  message?: string;
  data: T | null;
};

export type ActionResponseType<T = object, E = object> =
  | SuccessType<T>
  | ErrorType<E>;
