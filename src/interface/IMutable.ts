// eslint-disable-next-line @typescript-eslint/naming-convention
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
  };
  