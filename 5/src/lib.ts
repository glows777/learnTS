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

// 实现加减乘除
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

// 加
type add<num1 extends number, num2 extends number> = [
  ...BuildArray<num1>,
  ...BuildArray<num2>
]["length"];

type testAdd = add<1, 2>;

// 减
type subTract<
  num1 extends number,
  num2 extends number
> = BuildArray<num1> extends [...Arr1: BuildArray<num2>, ...Arr2: infer Rest]
  ? Rest["length"]
  : never;
type subTractTest = subTract<3, 2>;

// 乘
type multiply<
  num1 extends number,
  num2 extends number,
  result extends unknown[] = []
> = num2 extends 0
  ? result["length"]
  : multiply<num1, subTract<num2, 1>, [...BuildArray<num1>, ...result]>;
type testMultiply = multiply<2, 3>;

// 除
type divide<
  num1 extends number,
  num2 extends number,
  result extends unknown[] = []
> = num1 extends 0
  ? result["length"]
  : divide<subTract<num1, num2>, num2, [unknown, ...result]>;
type testDivide = divide<12, 3>;

// 实现类型的strLen
type myStrLen<
  str extends string,
  countArr extends unknown[] = []
> = str extends `${string}${infer Rest}`
  ? myStrLen<Rest, [unknown, ...countArr]>
  : countArr["length"];
type testStrLen = myStrLen<"hello">;

// 类型的比较大小
type myCompare<
  num1 extends number,
  num2 extends number,
  arr extends unknown[] = []
> = num1 extends num2
  ? false
  : arr["length"] extends num2
  ? true
  : arr["length"] extends num1
  ? false
  : myCompare<num1, num2, [unknown, ...arr]>;
type testCompare = myCompare<1, 2>;

// 实现类型的斐波那契数列
type FibonacciLoop<
  preArr extends unknown[],
  currentArr extends unknown[],
  indexArr extends unknown[],
  num extends number = 1
> = indexArr["length"] extends num
  ? currentArr["length"]
  : FibonacciLoop<
      currentArr,
      [...preArr, ...currentArr],
      [...indexArr, unknown],
      num
    >;
type testFib = FibonacciLoop<[1], [], [], 8>;

// 判断是否是联合类型
type isUion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type testUion = isUion<"a" | "b" | "c">;
type testUion2 = isUion<["a" | "b" | "c"]>;
// A extends A 这段看似没啥意义，主要是为了触发分布式条件类型，让 A 的每个类型单独传入。
// [B] extends [A] 这样不直接写 B 就可以避免触发分布式条件类型，那么 B 就是整个联合类型。
// B 是联合类型整体，而 A 是单个类型，自然不成立，而其它类型没有这种特殊处理，A 和 B 都是同一个，怎么判断都成立

// 将返回联合类型的组合
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;
type allCombination<A extends string, B extends string = A> = A extends A // 还是关键这句，触发分布式条件类型，让 A 的每个类型单独传入
  ? Combination<A, allCombination<Exclude<B, A>>>
  : never;
type testCombination = allCombination<"a" | "b" | "c">;
