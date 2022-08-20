/** 
 * ! 第8题
 * ? 定义 NonEmptyArray 工具类型，用于确保数据非空数组
type NonEmptyArray<T> = // 你的实现代码

const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
*/

type notEmptyArray<T> = [T, ...T[]];

const a: notEmptyArray<string> = ['a']
// const b:notEmptyArray<string> = [] // 报错