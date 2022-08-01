var hello = "Hello World";
function add(a, b) {
    return a + b;
}
// 联合类型
var sex;
sex = "male";
// unknown是一个类型安全的any
var a;
a = 1;
a = "hello";
var b = "111";
b = a;
var c;
c = { firstName: "111", lastName: "222", age: 16 };
var d;
d = add;
a = function (a, b, arr) {
    return a - b;
};
var e = [1, 2, 3];
var f = [1, 2, 3];
var g = [1, "2"];
var gender;
(function (gender) {
    gender[gender["male"] = 0] = "male";
    gender[gender["female"] = 1] = "female";
})(gender || (gender = {}));
var h = {
    name: "glows777",
    sex: gender.male
};
// 表示同时满足这两个条件
var i = {
    name: "glows777",
    age: 18
};
var j = 1;
