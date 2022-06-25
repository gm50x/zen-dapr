export type Filter<T> = {
  [TKey in keyof Partial<T>]: T[TKey] | Array<T[TKey]>;
};
