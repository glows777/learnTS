// 26
type IsNever<T> = [T] extends [never] ? true : false;
type testIsNever1 = IsNever<never>;
type testIsNever2 = IsNever<string | never>;

// 27
type Reverse1<T extends Array<any>, R extends Array<any> = []> = T extends [
  infer F,
  ...infer Rest
]
  ? Reverse1<Rest, [F, ...R]>
  : R;
type Reverse2<T extends Array<any>, R extends Array<any> = []> = T extends [
  ...infer Front,
  infer Last
]
  ? Reverse2<Front, [...R, Last]>
  : R;
type testReverse1 = Reverse1<[string, any, number]>;
type testReverse2 = Reverse2<[string, any, number]>;

// 28 没有trim！！！ 后面加一下
type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer F}${Delimiter}${infer R}`
  ? [F, ...Split<R, Delimiter>]
  : [S];
type testSplit = Split<"semlinker, lolo, kakuqo", ",">;

// 29
type ToPathHelper<T extends string> = // 过滤[]
  T extends `${infer F}[${infer M}]${infer R}`
    ? F extends ""
      ? R extends ""
        ? [M]
        : [M, ...ToPathHelper<R>]
      : [F, M, ...ToPathHelper<R>]
    : [T];
type ToPath<S extends string> = S extends `${infer F}.${infer R}` // 过滤.
  ? [...ToPathHelper<F>, ...ToPath<R>]
  : [S];

type aaaaa = ToPathHelper<"a[0][1]">;
type testToPath = ToPath<"a[0][1].a.b">;

// 30 -> 链式调用
/**
 * 完善 Chainable 类型的定义，使得 TS 能成功推断出 result 变量的类型。调用 option 方法之后会不断扩展当前对象的类型，使得调用 get 方法后能获取正确的类型。
// 期望 ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }
* * 这道题主要是要发现, config 可以进行链式调用, 这样可以很容易的联想到 js 中的 return this 这种思路, 
* * 那么这里 option 的返回值就应该是一个新的 Chainable, 把添加了新属性的类型当做下一个 Chainable 的 T 即可
 */
declare const config: Chainable;

type ChainableHelper<K extends string, V extends any, T = {}> = T & {
  [Key in [K] as `${K}`]: V;
};
type Chainable<T = {}> = {
  option<K extends string, V extends any>(
    key: K,
    value: V
  ): Chainable<ChainableHelper<K, V, T>>;
  get(): { [K in keyof T]: T[K] };
};

const result = config
  .option("age", 7)
  .option("name", "lolo")
  .option("address", { value: "XiaMen" })
  .get();

type ResultType = typeof result;

// 31
type Repeat<
  T,
  C extends number,
  R extends unknown[] = []
> = R["length"] extends C ? R : Repeat<T, C, [...R, T]>;
type testRepeat1 = Repeat<0, 0>;
type testRepeat2 = Repeat<number, 2>;

// 32
type RepeatStringHelper<T extends string[], R extends string = ""> = T extends [
  infer F,
  ...infer Rest
]
  ? F extends string
    ? Rest extends string[]
      ? RepeatStringHelper<Rest, `${R}${F}`>
      : ""
    : ""
  : R;
type RepeatString<
  T extends string,
  C extends number,
  R extends string[] = []
> = R["length"] extends C
  ? RepeatStringHelper<R>
  : RepeatString<T, C, [...R, T]>;
type testRepeatString1 = RepeatString<"a", 0>;
type testRepeatString2 = RepeatString<"ab", 3>;
type testRepeatString3 = RepeatString<"a", 2>;

// 111