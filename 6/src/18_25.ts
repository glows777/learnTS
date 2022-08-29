// 18 实现一个 UnionToIntersection 工具类型，用于把联合类型转换为交叉类型
type UnionToIntersection<U> = (U extends U ? (args: U) => any : never) extends (
  args: infer R
) => any
  ? R
  : never;
type testUnionToIntersection = UnionToIntersection<string | number>; // never
type testUnionToIntersection2 = UnionToIntersection<
  { age: number } | { name: string }
>;

// 19 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性, 返回联合类型-> 所以要后面多个[keyof T]去遍历。
type OptionalKeys<T> = NonNullable<
  {
    [K in keyof T]: {} extends Pick<T, K> ? K : never;
  }[keyof T]
>;
type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};
type testOPtionalKeys = OptionalKeys<Person>;

// 20 实现一个 Curry 工具类型，用来实现函数类型的柯里化处理
// type Curry<
//     F extends (...args: any[]) => any,
//     P extends any[] = Parameters<F>,
//     R = ReturnType<F>
// > = P extends [infer FirstItem, ...infer Rest]
//         ? (arg: FirstItem) => Curry<F, Rest, R>
//         : P['length'] extends 0
//             ? () => R
//             : never
// type F2 = Curry<(a: number, b: string) => Date>

// 20 保留参数名称版
// 思路： 就是要用...XXX解构数组的方式来标明参数，而不是指定参数名称
type CurryHelper<T extends any[]> = T extends [...infer Front, infer Last]
  ? Front extends []
    ? T
    : CurryHelper<Front>
  : [];
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer FirstItem, ...infer Rest]
  ? Rest extends []
    ? F
    : (...args: CurryHelper<P>) => Curry<(...args: Rest) => R, Rest, R> // 这里的...args就是，然后，只需要传一个，所以要提取,而因为用解构，所以要递归去提取，才能不报错，不然会报args是数组类型，而不是单个值单的错
  : F;
type F2 = Curry<(a: number, b: string) => Date>;

// 21 实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys
type Merge<T1, T2> = {
  [K in keyof T1 | keyof T2]: K extends keyof T1
    ? K extends keyof T2
      ? T2[K]
      : T1[K]
    : K extends keyof T2
    ? T2[K]
    : never;
};
type Merge2<T1, T2> = {
  // 简化版，先判断是不是T2的类型，是的话，直接返回T2[K]
  [K in keyof T1 | keyof T2]: K extends keyof T2
    ? T2[K]
    : K extends keyof T1
    ? T1[K]
    : never;
};
type Foo2 = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
};
type testMerge = Merge<Foo2, Bar>;
const ab: testMerge = { a: 1, b: 2 };

/// 22 实现一个 RequireAtLeastOne 工具类型，它将创建至少含有一个给定 Keys 的类型，其余的 Keys 保持原样
type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType
> = KeysType extends KeysType
  ? Required<Pick<ObjectType, KeysType>> &
      Pick<ObjectType, Exclude<keyof ObjectType, KeysType>>
  : never;
type Responder = {
  text?: () => string;
  json?: () => string;
  secure?: boolean;
};

const responder: RequireAtLeastOne<Responder, "text" | "json"> = {
  text: () => '{"message": "ok"}',
  secure: true,
};

// 23 实现一个 RemoveIndexSignature 工具类型，用于移除已有类型中的索引签名
// 通过[K extends ${infer Str}]可以区分到底是string类型还是string字面量类型
// type A = 'bar' extends `${infer R}` ? true : false // true
// type B = string extends `${infer R}` ? true : false  // false
type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer Str}` ? Str : never]: T[K];
};
interface Foo3 {
  [key: string]: any;
  [key: number]: any;
  bar: () => void;
}
type testRemove = RemoveIndexSignature<Foo2>;

// 24 实现一个 Mutable 工具类型，用于移除对象类型上所有属性或部分属性的 readonly 修饰符
type Mutable<T, Keys extends keyof T = keyof T> = {
  -readonly [K in Keys]: T[K];
} & Omit<T, Keys>;
type Foo4 = {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
};
type testMutable = Mutable<Foo3, "a">;
const aaa: testMutable = { a: 1, b: "2", c: true };
aaa.a = 3;
// aaa.b = '111' // Cannot assign to 'b' because it is a read-only property.(2540)

// 25 实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型
type IsUnion<T, U = T> = T extends T ? ([U] extends [T] ? false : true) : never;
// 后面的 [T] 就是一个联合类型拆开后的某一个，因此如果是联合类型的话 [U] extends [T] 一定为否
type I0 = IsUnion<string | number>; // true
type I1 = IsUnion<string | never>; // false
type I2 = IsUnion<string | unknown>; // false
type I3 = IsUnion<"a" | 1>; // true
type I4 = IsUnion<[]>; // false
