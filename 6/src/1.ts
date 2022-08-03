/**
 * ! 第一题
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2）
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer'
  }
}
* * 其实是需要知道makeCustomer想要返回什么，因为类型其实也是可以继承的，这就代表T可能会提供更多的属性或方法。
* * 比如我有一个继承了User类型的MyUser类型，它是能够作为参数传入的，T也就变成了MyUser，而现在的makeCustomer只是返回了User类型。
*/
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  return {
    ...u,
    id: u.id,
    kind: "customer",
  };
}
