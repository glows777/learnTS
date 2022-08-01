const Message = {
  name: "jimmy",
  age: 18,
  address: {
    province: "四川",
    city: "成都",
  },
};

type MessageType = typeof Message;

type messageUnion = keyof MessageType;

function getProp<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let bbbb = {
  num: 1,
  str: "hello",
  name: "John",
};

const ccc: string = getProp(bbbb, "name");

type myReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function func6(num: number): number {
  console.log(num);
  return num;
}

type yyy = myReturnType<typeof func6>;

type myTest<T> = T extends (...args: infer R) => any ? R : any;

type getArrayType<T> = T extends (infer R)[] ? R : any;

const arr: number[] = [1, 2, 3];

type myArrayType = number[];

type myTurple = [string, number];

type arrhhh = getArrayType<myArrayType>;

type turplehhh = getArrayType<myTurple>;

function myGet<T , K extends keyof T>(person: T, keys: K[]): T[K][] {
    return keys.map(key => person[key]);
}


