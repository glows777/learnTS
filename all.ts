/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2023-01-29 16:24:40
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2023-03-03 15:30:34
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
type Names = ["Sem", "Lolo", "Kaquko"];
type NamesComma = JoinStrArray<Names, ",">; // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " ">; // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️">; // "Sem⭐️Lolo⭐️Kaquko"

// ? 10
type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
type Trim<V extends string> = TrimLeft<TrimRight<V>>;
type trimTest = Trim<" hello       ">;

// ? 11
type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false; // 防止有一个是any
// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }>; // true
type E2 = IsEqual<[1], []>; // false
type E3 = IsEqual<{ a: 1; b: 2 }, { a: 1 }>; // false
type E4 = IsEqual<{ a: 1 }, { a: 1; b: 2 }>; // false

// ? 12
type Head<T extends Array<any>> = T extends [infer F, ...infer R] ? F : never;
type H0 = Head<[]>;
type H1 = Head<[1]>;
type H2 = Head<[2, 3]>;

// ? 13
// 同理12

// ? 14
type Unshift<T extends any[], E> = [E, ...T];
type Arr0 = Unshift<[], 1>;
type Arr1 = Unshift<[1, 2, 3], 0>;

// ? 15 16 同理14

// ? 17
type Includes<T extends Array<any>, E> = T extends [infer F, ...infer R]
  ? F extends E
    ? true
    : Includes<R, E>
  : false;
type I0 = Includes<[], 1>; // false
type I1 = Includes<[2, 2, 3, 1], 2>; // true
type I2 = Includes<[2, 3, 3, 1], 1>; // true

// ? 18 利用函数参数逆变 + 函数重载
type UnionToIntersection<U> = ( U extends any 
  ? (arg: U) => any 
  : never
  ) extends (arg: infer T) => any
  ? T
  : never;
type U0 = UnionToIntersection<string | number>; // never
type U1 = UnionToIntersection<{ name: string } | { age: number }>; // { name: string; } & { age: number; }

// ? 19
type OptionalKeys<T extends Record<string, any>> = Exclude<
  {
    [K in keyof T]: undefined extends T[K] ? K : never;
  }[keyof T],
  undefined
>;
type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};
type PersonOptionalKeys = OptionalKeys<Person>; // "from" | "speak"

// ? 20
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer First, ...infer Rest]
  ? Rest extends []
    ? (arg: First) => R
    : (arg: First) => Curry<(...args: Rest) => R>
  : R;
type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date


// ? 21
type Merge<First, Second> = {
  [K in keyof (First & Second)]: K extends keyof Second 
  ? Second[K]
  : K extends keyof First
    ? First[K]
    : never
}
type Foo2 = {
  a: number;
  b: string;
};

type Bar2 = {
  b: number;
};
const ab: Merge<Foo2, Bar2> = {a: 1, b: 2}

// ? 22
type Responder = {
  text?: () => string;
  json?: () => string;
  secure?: boolean;
};
type RequireAtLeastOne<
   ObjectType,
   KeysType extends keyof ObjectType = keyof ObjectType,
> = KeysType extends any 
  ? Omit<ObjectType, KeysType> & Required<Pick<ObjectType, KeysType>>
  : never 
const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  json: () => '{"message": "ok"}',
  secure: true
};

// ? 23
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K ]: T[K]
}
interface Foo3 {
  [key: string]: any;
  [key: number]: any;
  bar(): void;
}
type FooWithOnlyBar = RemoveIndexSignature<Foo3>; //{ bar: () => void; }

// ? 24
type Foo4 = {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
};

type Mutable<T, Keys extends keyof T = keyof T> = { -readonly[K in Keys]: T[K] } & Omit<T, Keys>
const mutableFoo: Mutable<Foo4, 'a'> = { a: 1, b: '2', c: true };

mutableFoo.a = 3; // OK
// mutableFoo.b = '6'; // Cannot assign to 'b' because it is a read-only property.

// ? 25
type IsUnion<T, U = T> = T extends any ? ([U] extends [T] ? false : true) : never

type I02 = IsUnion<string|number> // true
type I12 = IsUnion<string|never> // false
type I22 =IsUnion<string|unknown> // false

// ? 26
type IsNever<T> = [T] extends [never] ? true : false
type I03 = IsNever<never> // true
type I13 = IsNever<never | string> // false
type I23 = IsNever<null> // false

// ? 27
type Reverse<
  T extends Array<any>,
  R extends Array<any> = []
> = T extends [...infer Firsts, infer Last]
  ? Reverse<Firsts, [...R, Last]>
  : R

type R0 = Reverse<[]> // []
type R1 = Reverse<[1, 2, 3]> // [3, 2, 1]

// ? 28
type Item = 'semlinker,lolo,kakuqo';

type Split<
	S extends string, 
	Delimiter extends string,
> = S extends `${infer PreStr}${Delimiter}${infer NextStr}`
  ? [PreStr, ...Split<NextStr, Delimiter>]
  : [S]
type ElementType = Split<Item, ','>; // ["semlinker", "lolo", "kakuqo"]

// ? 29
type indexSignature<T> = T extends `${infer Pre}[${infer Mid}]${infer Rest}`
  ? [Pre, Mid, ...indexSignature<Rest>]
  : T extends `${infer Pre}[${infer Mid}]`
    ?[Pre, Mid]
    : [T]
type removeSpace<T> = T extends [infer F, ...infer Rest]
  ? F extends ''
    ? [...removeSpace<Rest>]
    : [F, ...removeSpace<Rest>]
  : T
type ToPath<S extends string> = S extends `${infer Pre}.${infer Rest}`
  ? [...removeSpace<indexSignature<Pre>>, ...ToPath<Rest>]
  : [...indexSignature<S>]

type t1 = ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
type t2 = ToPath<'foo[0].bar.baz'> //=> ['foo', '0', 'bar', 'baz']

// ? 30
declare const config: Chainable

type Chainable<T = {}> = {
  option<K extends string, V extends any>(key: K, value: V): Chainable<T & Record<K, V>>
  get(): { [K in keyof T]: T[K] }
}

const result = config
  .option('age', 7)
  .option('name', 'lolo')
  .option('address', { value: 'XiaMen' })
  .get()

type ResultType = typeof result  
// 期望 ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }




