"use strict";
class Person {
    constructor(age, name) {
        this.age = age;
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    sayHello() {
        console.log("Hello, " + this.name);
    }
}
Person.num = 0;
class Student extends Person {
    constructor(age, name, stuNo) {
        super(age, name);
        this.stuNo = stuNo;
    }
    getStuNO() {
        return this.stuNo;
    }
    setStuNO(stuNo) {
        this.stuNo = stuNo;
    }
    sayHello() {
        super.sayHello();
        console.log("Hello, " + this.stuNo);
    }
}
const person = new Person(10, "John");
console.log(person);
console.log(Person.num);
const stu1 = new Student(10, "John", "001");
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
class dog extends Animal {
    constructor(name, whereFrom) {
        super(name);
        this.whereFrom = whereFrom;
    }
    getWhereFrom() {
        return this.whereFrom;
    }
    setWhereFrom(whereFrom) {
        this.whereFrom = whereFrom;
    }
    sayHello() {
        console.log("Hello, " + this.getName());
    }
}
class chair {
    constructor(name, price, whereMade) {
        this.name = name;
        this.price = price;
        this.whereMade = whereMade;
    }
    getWhereMade() {
        return this.whereMade;
    }
    getPrice() {
        return this.price;
    }
}
