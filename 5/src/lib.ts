type myType = {
  name: string;
  age: number;
  stuNo?: number;
};

type student = Partial<myType>;

type family = Required<myType>;

type myself = Readonly<myType>;

type friend = Pick<myType, "name" | "age">;

type aaa = Exclude<"a" | "b" | "c", "a">;

type bbb = Extract<"a" | "b" | "c", "a" | "d">;

type classmate = Omit<myType, "stuNo">;

type myGetParam<func extends Function> = func extends (...args: infer Args) => unknown ? Args : never;

function add(a: number, b: number): number {
  return a + b;
}

type addParamType = myGetParam<typeof add>;