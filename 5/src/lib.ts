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

