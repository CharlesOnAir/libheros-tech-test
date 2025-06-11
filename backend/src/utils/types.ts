// Use this class to debug complex types
// https://stackoverflow.com/questions/61412688/how-to-view-full-type-definition-on-hover-in-vscode-typescript#answer-76527542
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type LooseRecord<T> = Record<string | number | symbol, T>;

export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Mutable<T extends BaseEntity> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsArray<T> = (T & any[]) | T[];

export type FromArray<T> = T extends (infer K)[] ? K : never;

export type WithOptional<T, K extends keyof T> = Partial<T> & Omit<T, K>;

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type With<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends (infer R)[]
    ? NestedPartial<R>[]
    : T[K] extends object
      ? NestedPartial<T[K]>
      : T[K];
};

export type Or<T, U> = T | U;

export type KeyOr<T, U> = {
  [K in keyof T]: T[K] | U;
};

export type NestedKeyOr<T, U> = {
  [K in keyof T]: T[K] extends object ? U | NestedKeyOr<T[K], U> : T[K] | U;
};

// Use this class to debug complex types
// This awesome utility type comes from: https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
// Note it does not work on auto-referencing types like type Toto = { a: Toto };
export type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends T
        ? never
        : `${Exclude<K, symbol>}${'' | `.${Path<T[K]>}`}`;
    }[keyof T]
  : never;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Date
      ? Date
      : DeepPartial<T[P]>
    : T[P];
};

export type DeepNonNullable<T> = {
  [P in keyof T]: T[P] extends object
    ? T[P] extends Date
      ? Date
      : DeepNonNullable<T[P]>
    : NonNullable<T[P]>;
};
