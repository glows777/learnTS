/** 
 * ! 第四题
 * ? ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：
 * 
interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}

 * * 法一： 采用先找出符合条件的属性的key，然后遍历这个包含符合条件的所有key形成的联合类型，返回一个新类型 
 * * 法二： 同理，只不过用的是as断言，更加直接 
*/
type helper<T, K extends keyof T, U> = K extends any ? (T[K] extends U ? K : never) : never; // 获取符合这个类型的所有key，返回一个联合类型

type ConditionalPick<T, U> = {
    [K in helper<T, keyof T, U>]: T[K];
}
/** 这个也可以 采用as断言
type ConditionalPick<V, T> = {
  [K in keyof V as V[K] extends T ? K : never]: V[K];
};
 */

interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
    e: string;
}

type StringKeysOnly = ConditionalPick<Example, string | number>;
