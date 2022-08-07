type myType = {
  name: string;
  age: number;
  stuNo?: number;
};

type student = Partial<myType>;

type family = Required<myType>;

type myself = Readonly<myType>;

type friend = Pick<myType, "name" | "age">;

type aaa = Exclude<"a" | "b" | "c", "a">;

type bbb = Extract<"a" | "b" | "c", "a" | "d">;

type classmate = Omit<myType, "stuNo">;

type myGetParam<func extends Function> = func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

function add(a: number, b: number): number {
  return a + b;
}

type addParamType = myGetParam<typeof add>;
// 合并两个数组
type zipp<One extends unknown[], Other extends unknown> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [OneFirst, OtherFirst, ...zipp<OneRest, OtherRest>]
    : never
  : never;

type ttt = Promise<Promise<Promise<Record<string, any>>>>;
type deep<T> = T extends Promise<infer R> ? deep<R> : T;

type a = deep<ttt>;

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
// 是否包含某个元素
type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer firstItem,
  ...infer Rest
]
  ? IsEqual<firstItem, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;

// 移除数组中的某个元素
type removeItem<
  Arr extends unknown[],
  item,
  Result extends unknown[] = []
> = Arr extends [infer firstItem, ...infer Rest]
  ? IsEqual<firstItem, item> extends true
    ? removeItem<Rest, item, Result>
    : removeItem<Rest, item, [...Result, firstItem]>
  : Result;

type test = removeItem<[1, 2, 3, 4], 2>;

// 深度遍历，修改属性
// ts 只有类型被用到的时候才会做类型计算，所以前面加一段T extends any ? {...} : never来触发计算
type deepReadOnly<T extends Record<string, any>> = T extends any
  ? {
      readonly [K in keyof T]: T[K] extends object
        ? T[K] extends Function
          ? T[K]
          : deepReadOnly<T[K]>
        : T[K];
    }
  : never;

type obj = {
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};

type test2 = deepReadOnly<obj>;
