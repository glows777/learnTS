/**
 * ! 第二题
 * 
 * ? 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
 * 
 * * 利用函数重载，可以让函数接受不同类型的参数，但是返回值的类型必须是相同的。
 */
function f(a: number, b: number): number;
function f(a: string, b: string): string;
function f(a: string | number, b: string | number) {
  if (typeof a === "string" || typeof b === "string") {
    return a + ":" + b;
  } else {
    return a + b;
  }
}

//   f(2, 3); // Ok
//   f(1, 'a'); // Error
//   f('a', 2); // Error
//   f('a', 'b') // Ok
