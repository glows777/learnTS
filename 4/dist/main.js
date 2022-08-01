"use strict";
const Message = {
    name: "jimmy",
    age: 18,
    address: {
        province: "四川",
        city: "成都",
    },
};
function getProp(obj, key) {
    return obj[key];
}
let bbbb = {
    num: 1,
    str: "hello",
    name: "John",
};
const ccc = getProp(bbbb, "name");
function func6(num) {
    console.log(num);
    return num;
}
const arr = [1, 2, 3];
