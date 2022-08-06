/** 
 * ! 第6题
 * ? 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：
type NaiveFlat<T extends any[]> = // 你的实现代码

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"

 * * 递归处理即可，然后使用XXX[number]来遍历结果，返回一个联合类型
*/
type NaiveFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? NaiveFlat<T[K]> : T[K];
}[number];

type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type NaiveResult = NaiveFlat<Deep>;
















