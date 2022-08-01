class Person {
    age: number;
    name: string;
    static readonly num: number = 0;
    constructor(age: number, name: string) {
        this.age = age;
        this.name = name;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }
    sayHello(): void {
        console.log("Hello, " + this.name);
    }
}
class Student extends Person {
    stuNo: string;
    constructor(age: number, name: string, stuNo: string) {
        super(age, name);
        this.stuNo = stuNo;
    }
    getStuNO(): string {
        return this.stuNo;
    }
    setStuNO(stuNo: string): void {
        this.stuNo = stuNo;
    }
    sayHello(): void {
        super.sayHello();
        console.log("Hello, " + this.stuNo);
    }
}

const person: Person = new Person(10, "John");

console.log(person);
console.log(Person.num);

const stu1: Student = new Student(10, "John", "001");

abstract class Animal {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract sayHello(): void;
    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
}

class dog extends Animal {
    private whereFrom: string;
    constructor(name: string, whereFrom: string) {
        super(name);
        this.whereFrom = whereFrom;
    }
    public getWhereFrom(): string {
        return this.whereFrom;
    }
    public setWhereFrom(whereFrom: string): void {
        this.whereFrom = whereFrom;
    }
    sayHello(): void {
        console.log("Hello, " + this.getName());
    }
}

interface Furniture {
    name: string;
    price: number;
    getPrice(): number;
}
interface Furniture2 {
    whereMade: string;
    getWhereMade(): string;
}
class chair implements Furniture, Furniture2 {
    name: string;
    price: number;
    whereMade: string;
    constructor(name: string, price: number, whereMade: string) {
        this.name = name;
        this.price = price;
        this.whereMade = whereMade;
    }
    getWhereMade(): string {
        return this.whereMade;
    }
    getPrice(): number {
        return this.price;
    }
}

