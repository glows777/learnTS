const hello: string = "Hello World";

function add(a: number, b: number): number {
  return a + b;
}

// 联合类型
let sex: "male" | "female";
sex = "male";

// unknown是一个类型安全的any
let a: unknown;
a = 1;
a = "hello";

let b: string = "111";

b = <string>a;

let c: { firstName: string; lastName?: string; [props: string]: any };

c = { firstName: "111", lastName: "222", age: 16 };

let d: (a: number, b: number, arr?: number[]) => number;

d = add;

d = function (a: number, b: number, arr?: number[]): number {
  // console.log(arr);
  return a - b;
};

let e: number[] = [1, 2, 3];
let f: Array<number> = [1, 2, 3];

let g: [number, string] = [1, "2"];

enum gender {
  male = 0,
  female = 1,
}

let h: { name: string; sex: gender | number } = {
  name: "glows777",
  sex: gender.male,
};

// 表示同时满足这两个条件
let i: {name: string} & {age: number} = {
    name: "glows777",
    age: 18
}

type myType =  1 | 2 | 3;
let j: myType = 1;
