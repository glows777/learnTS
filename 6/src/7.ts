/** 
 * ! 第7题
 * ? 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值：
type EmptyObject = {} 

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = { // 将出现编译错误
  prop: "TS"
}
 * ? 更改以下 takeSomeTypeOnly 函数的类型定义，让它的参数只允许严格SomeType类型的值。具体的使用示例如下所示：
type SomeType =  {
  prop: string
}

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly(x: SomeType) { return x }

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // 将出现编译错误
*/

// * 1. 定义一个类型别名EmptyObject，使得该类型只允许空对象赋值
type key = string | symbol | number;
type emptyObject = {
    [K in key]: never
}
const shouldPass: emptyObject = {}; // 可以正常赋值
// const shouldFail: emptyObject = { // 将出现编译错误
//   prop: "TS"
// }

// * 2. 更改以下 takeSomeTypeOnly 函数的类型定义，让它的参数只允许严格SomeType类型的值。具体的使用示例如下所示：
type onlyType<T, U> = {
    [K in keyof T as K extends keyof U ? K : never]: T[K]
}
type onlyType2<T, U> = {
    [K in keyof T]: K extends keyof U ? T[K] : never
}
// 上面两个都可以
type someType = {
    hi: string,
    hh: number
}
function takeSomeTypeOnly<T extends someType>(x: onlyType<T, someType>) {return x}
// takeSomeTypeOnly({hi: "aaa", hh: 111, jj: 2222}) // 报错