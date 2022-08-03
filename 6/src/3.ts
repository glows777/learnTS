/**
 * ! 第三题
 * ? 定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的
 * ? 实现 SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的
测试用例：
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }

// 测试用例
type SomeRequired = SetRequired<Foo, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }

 * * 首先获取到要变为可选的参数，我们用 pick 获取到参数中的属性，然后用Partial 将他们全部变为可选
 * * 使用 Pick 和 Exclude 将不变化的参数拿出来(Omit也可以)
 * * 将两个结果交叉类型
 */

type Foo = {
  a: number;
  b?: string;
  c: boolean;
};

type Simplify<T> = { [P in keyof T]: T[P] }; // 取出T中的所有属性,并返回这个对象的类型，让类型推断更智能一点

// 可选
type SetOptional<T, K extends keyof T> = Simplify<
  Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>
>;

// 必须
type SetRequired<T, K extends keyof T> = Simplify<Required<Pick <T, K>> & Pick<T, Exclude<keyof T, K>>>;


type test = SetOptional<Foo, "a" | "b">;
type test2 = SetRequired<Foo, "b" | "c">;

let a: test = {
  c: true,
};

let b: test2 = {
    a: 1,
    b: "",
    c: true,
}
