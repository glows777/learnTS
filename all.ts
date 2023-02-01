/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2023-01-29 16:24:40
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2023-02-01 17:52:20
 * @FilePath: \learnTS\all.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
// ! 链接在这里
// https://github.com/semlinker/awesome-typescript/issues?page=2&q=is%3Aissue+is%3Aopen
type Simplify<T> = {
  [K in keyof T]: T[K];
};

// ? 2 函数重载
function func(a: number, b: number): number;
function func(a: string, b: string): string;
function func(a: string | number, b: string | number): string | number {
  if (typeof a === "string") {
    return a + ":" + b;
  } else {
    return (a as number) + (b as number);
  }
}

// ? 3
type SetOptional<T, K extends keyof T> = Partial<Pick<T, K>> &
  Pick<T, Exclude<keyof T, K>>;
type Foo = {
  a: number;
  b?: string;
  c: boolean;
};
// 测试用例：
type SomeOptional = Simplify<SetOptional<Foo, "a" | "b">>;

// ? 4
type ConditionalPick<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
interface Example {
  a: string;
  b: string | number;
  c: () => void;
  d: {};
}
// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;

// ? 5
type AppendArgument<F extends (...args: any) => any, Type> = F extends (
  ...args: infer Args
) => infer R
  ? (x: Type, ...args: Args) => R
  : never;
type Fn = (a: number, b: string) => number;
type FinalFn = AppendArgument<Fn, boolean>;
// (x: boolean, a: number, b: string) => number

// ? 6
type DeepFlat<T extends any[]> = {
  [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K];
}[number];
type Deep = [["a"], ["b", "c"], [["d"]], [[[["e"]]]]];
type DeepTestResult = DeepFlat<Deep>;

// ? 7
type TakeSomeTYpeOnly<
  T1 extends Record<string, any>,
  T2 extends Record<string, any>
> = {
  [K in keyof T2]: K extends keyof T1 ? T2[K] : never;
};
type SomeType = {
  prop: string;
};
function takeSomeTypeOnly<T extends SomeType>(
  x: TakeSomeTYpeOnly<SomeType, T>
) {
  return x;
}
// 测试用例：
const x = { prop: "a" };
takeSomeTypeOnly(x); // 可以正常调用

const y = { prop: "a", addditionalProp: "x" };
// takeSomeTypeOnly(y) 将出现编译错误

// ? 8
type NonEmptyArray<T> = [T, ...T[]];
type NonEmptyArray2<T> = { 0: T } & T[];
// const a: NonEmptyArray<string> = [] 编译错误
const b: NonEmptyArray<string> = ["hello"];

// ? 9
type JoinStrArray<
  Arr extends string[],
  Sep extends string,
  R extends string = ""
> = Arr extends [infer F extends string, ...infer Rest extends string[]]
  ? JoinStrArray<Rest, Sep, R extends "" ? `${F}` : `${R}${Sep}${F}`>
  : R;
  type Names = ["Sem", "Lolo", "Kaquko"]
  type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
  type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
  type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"

  // ? 10
  type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V
  type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V
  type Trim<V extends string> = TrimLeft<TrimRight<V>>
  type trimTest = Trim<' hello       '>

  // ? 11
  type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false // 防止有一个是any
  // 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }>; // true
type E2 = IsEqual<[1], []>; // false
type E3 = IsEqual<{ a: 1, b: 2 }, { a: 1 }>; // false
type E4 = IsEqual<{ a: 1 }, { a: 1, b: 2 }>; // false

// ? 12
type Head<T extends Array<any>> = T extends [infer F, ...infer R] ? F : never
type H0 = Head<[]>
type H1 = Head<[1]>
type H2 = Head<[2, 3]>

// ? 13
// 同理12

// ? 14
type Unshift<T extends any[], E> = [E, ...T]
type Arr0 = Unshift<[], 1>
type Arr1 = Unshift<[1, 2, 3], 0>

// ? 15 16 同理14

// ? 17
