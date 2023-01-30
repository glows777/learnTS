/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2023-01-29 16:24:40
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2023-01-30 22:42:17
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
  [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K]
}[number]
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  



