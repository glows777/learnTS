
// 13 取出数组的除第一个元素外的其余元素
type Tail<T extends unknown[]> = T extends [firstItem: infer F, ...Rest: infer R] ? R : [];
type testTail = Tail<[]>
type testTail2 = Tail<[1]>
type testTail3 = Tail<[1, 2, 3]>

// 14 在数组的第一位添加一个元素
type Unshift<T extends unknown, E> = T extends [...infer R] ? [E, ...R] : never;
type testUnshift = Unshift<[1, 2], 3>
type testUnshift2 = Unshift<[], 1>
type testUnshift3 = Unshift<{}, 1>

// 15 弹出数组的第一个元素
type Shift<T extends unknown[]> = T extends [FirstItem: infer F, ...Rest: infer R] ? R : never
type testShift = Shift<[1, 2, 3]>
type testShift3 = Shift<[string, string, number]>

// 16 往数组末尾添加一个元素
type Push<T extends unknown[], V> = T extends [...infer R] ? [...R, V] : never;
type testPush = Push<[1, 2, "3"], "5">
type testPush2 = Push<[], 1>

// 17 判断数组是否含有某个元素
type Includes<T extends unknown[], E> = 
    T extends [infer F, ...infer R] 
        ? IsEqual<F, E> extends true // IsEqual在第11题
            ? true
            : Includes<R, E>
        : IsEqual<T[0], E>;
type Includes2<T extends unknown[], E> = E extends T[number] ? true : false;
type testIncludes = Includes<[1, 2, 3], 1>
type testIncludes2 = Includes<[1, 2, 3], 4>
type testIncludes21 = Includes2<[1, 2, 3], 1>
type testIncludes22 = Includes2<[1, 2, 3], 4>
