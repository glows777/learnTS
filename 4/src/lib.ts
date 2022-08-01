function A(a: number): number {
  return a;
}

function func1<T>(a: T): T {
  return a;
}

const a: number = func1<number>(1);

interface hh {
  a: number;
}
function func3<T extends hh>(a: T): number {
  return a.a;
}

class hello<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
}
const h = new hello<string>("hello");

function mySum(num1: number, num2: number, ...less: number[]) {
  return num1 + num2 + less.reduce((a, b) => a + b);
}

type hhh = [number, ...string[]];

const newHhh: hhh = [1, "a", "b", "c"];

const aaa = 1;
const aa: number = 1;

console.log(typeof aaa);

const arrNumber: number[] = [1, 2, 3];
const firstA: number = arrNumber.find((a) => a > 1) as number;

type jj = (a: number) => number;

function func4(a?: jj): number {
  return a!(1);
}
interface jjj {
  a: number;
  b?: number;
}

let aaa1: jjj = { a: 1 };

const aaa2: { x: 1 | 2 | 3 } = {
  x: 1,
};


interface kkk {
  name: string
}

function sayHi(arg: kkk): void {
  console.log(arg.name);
}

// * 绕过多余的类型检查 -> 鸭子模型
let obj = {
  a : 1,
  name: "John"
}
sayHi(obj);

// * 通过类型断言来绕过多余的检查
interface Prop {
  name: string; 
  age: number; 
  money?: number;
}

let p: Prop = {
  name: "John",
  age: 20,
  gender: 0
} as Prop;

function func5<T, V>(message: T, value: V,): T {
  console.log(value);
  return message;
}

func5<string, number>("glows777", 1);

