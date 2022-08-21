/** 
 * ! 第11题
 * ? 实现一个 IsEqual 工具类型，用于比较两个类型是否相等。具体的使用示例如下所示：
type IsEqual<A, B> = // 你的实现代码

// 测试用例
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }> // true
type E2 = IsEqual<[1], []>; // false
*/

type IsEqual<T1, T2> = T1 extends T2 ? (T2 extends T2 ? true : false) : false;

type testIsEqual = IsEqual<1, 1>;
type testIsEqual2 = IsEqual<1, 2>;
type testIsEqual3 = IsEqual<[], [1]>;
type testIsEqual4 = IsEqual<{ a: 1 }, { a: 1 }>;
type testIsEqual5 = IsEqual<{ a: 1 }, { a: 1; b: 2 }>;
