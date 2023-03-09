/*
 * @Author: glows777 1914426389@qq.com
 * @Date: 2023-01-29 16:24:40
 * @LastEditors: glows777 1914426389@qq.com
 * @LastEditTime: 2023-03-09 14:28:35
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

// ? 31
type Repeat<T, C extends number, R extends Array<any> = []> = R['length'] extends C 
  ? R
  : Repeat<T, C, [...R, T]>

type R02 = Repeat<0, 0>; // []
type R12 = Repeat<1, 1>; // [1]
type R22 = Repeat<number, 2>; // [number, number]

// ? 32
type RepeatString<
  T extends string,
  C extends number,
  R extends Array<any> = [],
  Str extends string = ''
> = R['length'] extends C
  ? Str
  : RepeatString<`${T}`, C, [...R, T], `${Str}${T}`>

type S0 = RepeatString<"a", 0>; // ''
type S1 = RepeatString<"a", 2>; // 'aa'
type S2 = RepeatString<"ab", 3>; // 'ababab'

// ? 33
type ToNumber<T extends string, R extends any[] = []> = `${R['length']}` extends T 
  ? R['length']
  : ToNumber<T, [...R, T]>

type T0 = ToNumber<"0">; // 0
type T1 = ToNumber<"10">; // 10
type T2 = ToNumber<"20">; // 20

// ? 34
type SmallerThan<
  N extends number,
  M extends number,
  R extends Array<any> = []
> = R['length'] extends N
  ? R['length'] extends M
    ? false
    : true
  : R['length'] extends M
    ? false
    : SmallerThan<N, M, [...R, 1]>

type S02 = SmallerThan<0, 1>; // true
type S12 = SmallerThan<2, 0>; // false
type S22 = SmallerThan<8, 10>; // true

// ? 35
type GenerateArray<T extends number, R extends any[] = []> = R['length'] extends T 
  ? R
  : GenerateArray<T, [...R, T]>
type Add<T extends number, R extends number> = [...GenerateArray<T>, ...GenerateArray<R>]['length']

type A0 = Add<5, 5>; // 10
type A1 = Add<8, 20> // 28
type A2 = Add<10, 30>; // 40

// ? 36
type IsAny<T> = 1 extends (0 & T) ? true : false
type Filter<T extends any[], F> = T extends [infer First, ...infer Rest]
  ? IsAny<First> extends true
    ? [First, ...Filter<Rest, F>]
    : [...(First extends F ? [First] : []), ...Filter<Rest, F>]
  : [] 

type F02 = Filter<[6, "lolo", 7, "semlinker", false], number>; // [6, 7]
type F12 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
type F22 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]

// ? 37
type Flat<T extends any[]> = T extends [infer F, ...infer Rest] 
  ? F extends Array<any>
    ? [...Flat<F>, ...Flat<Rest>]
    : [F, ...Flat<Rest>]
  : []

type F03 = Flat<[]> // []
type F13 = Flat<['a', 'b', 'c']> // ["a", "b", "c"]
type F23 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]

// ? 38
type StartsWith<T extends string, U extends string> = T extends `${U}${infer Rest}` 
  ? true
  : false
type EndsWith<T extends string, U extends string> = T extends `${infer Rest}${U}` 
  ? true
  : false
type E02 = EndsWith<'123', '23'> // true
type E12 = EndsWith<'123', '13'> // false
type E22 = EndsWith<'123', '123'> // true
type S03 = StartsWith<'123', '12'> // true
type S13 = StartsWith<'123', '13'> // false
type S23 = StartsWith<'123', '1234'> // false 

// ? 39
type IsAny2<T> = 1 extends ( 0 & T) ? true : false

type I04 = IsAny2<never> // false
type I14 = IsAny2<unknown> // false
type I24 = IsAny2<any> // true

// ? 40
type Flasy = 0 | "" | false | []
type NotEmptyObject<T> = T extends {} ? ({} extends T ? false : true) : true
type AnyOf<T extends any[]> = T extends [infer F, ...infer Rest]
  ? F extends Flasy
    ? AnyOf<Rest>
    : NotEmptyObject<F>
  : false
type A02 = AnyOf<[]>; // false
type A12 = AnyOf<[0, '', false, [], {}]> // false
type A22 = AnyOf<[1, "", false, [], {}]> // true

// ? 41
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Pre}${From}${infer Last}`
  ? `${Pre}${To}${Last}`
  : S
type R03 = Replace<'', '', ''> // ''
type R13 = Replace<'foobar', 'bar', 'foo'> // "foofoo"
type R23 = Replace<'foobarbar', 'bar', 'foo'> // "foofoobar"
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Pre}${From}${infer Last}`
  ? `${Pre}${To}${ReplaceAll<Last, From, To>}`
  : S
type R04 = ReplaceAll<'', '', ''> // ''
type R14 = ReplaceAll<'barfoo', 'bar', 'foo'> // "foofoo"
type R24 = ReplaceAll<'foobarbar', 'bar', 'foo'> // "foofoofoo"
type R34 = ReplaceAll<'foobarfoobar', 'ob', 'b'> // "fobarfobar"

// ? 42
type IndexOf<A extends any[], Item, T extends Array<any> = []> = A extends [infer F, ...infer Rest]
  ? F extends Item
    ? T['length']
    : IndexOf<Rest, Item, [...T, Item]>
  : -1

type Arr = [1, 2, 3, 4, 5]
type I05 = IndexOf<Arr, 0> // -1
type I15 = IndexOf<Arr, 1> // 0
type I25 = IndexOf<Arr, 3> // 2

// ? 43
type Permutation<T, K=T> = [T] extends [never] 
  ? [] 
  : K extends K 
    ? [K, ...Permutation<Exclude<T, K>>] 
    : never
// ["a", "b"] | ["b", "a"]
type P0 = Permutation<'a' | 'b'>  // ['a', 'b'] | ['b' | 'a']
// type P1 = ["a", "b", "c"] | ["a", "c", "b"] | ["b", "a", "c"] 
// | ["b", "c", "a"] | ["c", "a", "b"] | ["c", "b", "a"]
type P1 = Permutation<'a' | 'b' | 'c'> 

// ? 44
type Unpacked<T> = T extends Array<infer T1>
  ? Unpacked<T1>
  : T extends Promise<infer T2>
    ? Unpacked<T2>
    : T extends (...args) => infer T3
      ? Unpacked<T3>
      : T
type T00 = Unpacked<string>;  // string
type T01 = Unpacked<string[]>;  // string
type T02 = Unpacked<() => string>;  // string
type T03 = Unpacked<Promise<string>>;  // string
type T04 = Unpacked<Unpacked<Promise<string>[]>>;  // string
type T05 = Unpacked<any>;  // any
type T06 = Unpacked<never>;  // never

// ? 45
type JsonifiedObject<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? 'toJSON' extends keyof T[K]
      ? T[K]['toJSON'] extends (...args) => infer R
        ? R
        : never
      : T[K] extends (...args) => any
        ? never
        : JsonifiedObject<T[K]>
    : T[K]
}
type MyObject = {
  str: "literalstring",
  fn: () => void,
  date: Date,
  customClass: MyClass,
  obj: {
    prop: "property",
    clz: MyClass,
    nested: { attr: Date }
  },
}

declare class MyClass {
  toJSON(): "MyClass";
}
/**
 * type JsonifiedMyObject = {
 *  str: "literalstring";
 *  fn: never;
 *  date: string;
 *  customClass: "MyClass";
 *  obj: JsonifiedObject<{
 *    prop: "property";
 *    clz: MyClass;
 *    nested: {
 *      attr: Date;
 *    };
 *   }>;
 * }
*/
type JsonifiedMyObject = JsonifiedObject<MyObject>;
declare let ex: JsonifiedMyObject;
const z1: "MyClass" = ex.customClass;
const z2: string = ex.obj.nested.attr;

// ? 46
interface Person2 {
  name: string;
  age?: number;
  gender?: number;
}

type RequireAllOrNone<T, K extends keyof T> = Omit<T, K> & (Required<Pick<T, K>> | Partial<Record<K, never>>)
                                              
const p1: RequireAllOrNone<Person2, 'age' | 'gender'> = {
  name: "lolo",
};

const p2: RequireAllOrNone<Person2, 'age' | 'gender'> = {
  name: "lolo",
  age: 7,
  gender: 1
};

// ? 47
interface Person3 {
  name: string;
  age?: number;
  gender?: number;
}

// 只能包含Keys中唯一的一个Key
type RequireExactlyOne<T, Keys extends keyof T, K extends keyof T = Keys> = Keys extends any 
  ? Omit<T, Keys> & Required<Pick<T, Keys>> & Partial<Record<Exclude<K, Keys>, never>>
  : never

const p12: RequireExactlyOne<Person3, 'age' | 'gender'> = {
  name: "lolo",
  age: 7,
};

const p22: RequireExactlyOne<Person3, 'age' | 'gender'> = {
  name: "lolo",
  gender: 1
};

// Error
const p3: RequireExactlyOne<Person3, 'age' | 'gender'> = {
  name: "lolo",
  age: 7,
  // gender: 1
};

// ? 48
type ConsistsOnlyOf<LongString extends string, Substring extends string> = LongString extends `${Substring}${infer Rest}`
  ? ConsistsOnlyOf<Rest, Substring>
  : LongString extends ''
    ? true
    : false
type C0 = ConsistsOnlyOf<'aaa', 'a'> //=> true
type C1 = ConsistsOnlyOf<'ababab', 'ab'> //=> true
type C2 = ConsistsOnlyOf<'aBa', 'a'> //=> false
type C3 = ConsistsOnlyOf<'', 'a'> //=> true

// ? 49
type UnionToArray<T> = UnionToIntersection<T extends any ? (args: T) => any : never> extends (args: infer R) => any
    ? [...UnionToArray<Exclude<T, R>>, R]
    : [];
type A03 = UnionToArray<'aaa' | 'bbb' | 'ccc'> //=> ['aaa' , 'bbb' , 'ccc']
type A13 = UnionToArray<1 | 2 | 3 > //=> [1, 2, 3]
type A23 = UnionToArray<{type:'input'} | {type:'select',hasOptions:boolean}> //=> [{type:'input'} ,{type:'select',hasOptions:boolean}]


