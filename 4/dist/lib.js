"use strict";
function A(a) {
    return a;
}
function func1(a) {
    return a;
}
const a = func1(1);
function func3(a) {
    return a.a;
}
class hello {
    constructor(name) {
        this.name = name;
    }
}
const h = new hello("hello");
function mySum(num1, num2, ...less) {
    return num1 + num2 + less.reduce((a, b) => a + b);
}
const newHhh = [1, "a", "b", "c"];
const aaa = 1;
const aa = 1;
console.log(typeof aaa);
const arrNumber = [1, 2, 3];
const firstA = arrNumber.find((a) => a > 1);
function func4(a) {
    return a(1);
}
let aaa1 = { a: 1 };
const aaa2 = {
    x: 1,
};
function sayHi(arg) {
    console.log(arg.name);
}
// * 绕过多余的类型检查 -> 鸭子模型
let obj = {
    a: 1,
    name: "John"
};
sayHi(obj);
let p = {
    name: "John",
    age: 20,
    gender: 0
};
function func5(message, value) {
    console.log(value);
    return message;
}
func5("glows777", 1);
