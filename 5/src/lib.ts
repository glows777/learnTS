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

// 判断是不是any
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，所以可以根据这个来判断是不是 any 类型
type isAny<T> = "glows777" extends "WCG" & T ? true : false;
type testIsAny = isAny<"glows777">;

// 判断两个类型是不是相同的类型，是则返回false
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true;
// 元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number，所以，可以根据这个来判断是不是元组类型
type isTuple<T> = T extends [...params: infer Arr]
  ? NotEqual<T["length"], number>
  : false;
type testIsTuple = isTuple<[1, 2, 3]>;
type testIsTuple2 = isTuple<number[]>;

// 过滤出可选属性
type getOptionnal<T extends Record<string, any>> = {
  // 可选的意思是这个索引可能没有，没有的时候，那 Pick<T, K> 就是空的，所以 {} extends Pick<T, K> 就能过滤出可选索引。
  // 可选的意思是指有没有这个索引，而不是索引值是不是可能 undefined
  [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};
type tmp = {
  a: string;
  b?: number | string;
  [key: string]: any;
};
type testGetOptional = getOptionnal<tmp>;

// 筛选出必须属性的索引并返回
type isRequired<T, K extends keyof T> = {} extends Pick<T, K> ? never : K;
// 过滤出必选属性
type getRequire<T extends Record<string, any>> = {
  [K in keyof T as isRequired<T, K>]: T[K];
};
type testIsRequired = getRequire<tmp>;

// 过滤掉签名属性
type removeIndexSignature<T extends Record<string, any>> = {
  [K in keyof T as K extends `${infer Str}` ? Str : never]: T[K];
};
type testRemoveIndexSignature = removeIndexSignature<tmp>;


// 做一个提取"a=1&a=2&b=2&c=3"为{a: [1, 2], b: 2, c: 3}的类型
// 这个是用于合并两个值的，如果是一样的，则返回一个，不一样则返回数组
type mergeValue<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];
// 用于合并两个{...}，如果是一样的key，则要进行合并这个key的值，不一样的key则直接返回
type mergeParam<
  One extends Record<string, any>,
  Other extends Record<string, any>
> = {
  [K in keyof One | keyof Other]: K extends keyof One
    ? K extends keyof Other
      ? mergeValue<One[K], Other[K]>
      : One[K]
    : K extends keyof Other
    ? Other[K]
    : never;
};
// 用于解析参数并返回{...}
type parseParam<Str extends string> = Str extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value;
    }
  : {};
// 递归处理，每一次返回来，在合并
type parseQueryString<T extends string> =
  T extends `${infer param}&${infer Rest}`
    ? mergeParam<parseParam<param>, parseQueryString<Rest>>
    : parseParam<T>;
type res = parseQueryString<"a=1&a=2&b=2&c=3">;
