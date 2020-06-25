# typescript guard tools

> ESNext module, please use [webpack](https://webpack.js.org/) / [rollup](https://rollupjs.org/guide/en/) / [parcel](https://parceljs.org/) / etc.

> UPDATE: `isEqualTo` type guard now use `Object.is` instead of `===`.
> UPDATE: the `isBrowser` &` isNodeJS` constants are now functions due to incorrect `rollup` tree shaking of unused pre-calculated constants.

## typeof var guards
```ts
export declare function isNull(it: unknown): it is null;
export declare function isBigInt(it: unknown): it is bigint;
export declare function isBoolean(it: unknown): it is boolean;
export declare function isFunction(it: unknown): it is (...args: any[]) => any;
export declare function isConstructor(it: unknown): it is new (...args: any[]) => any;
// number and new Number => true; NaN and new Number(NaN) => false
export declare function isNumber(it: unknown): it is number;
export declare function isObject(it: unknown): it is object;
export declare function isRecord(it: unknown): it is Record<keyof any, any>;
// string and new String => true
export declare function isString(it: unknown): it is string;
export declare function isSymbol(it: unknown): it is symbol;
export declare function isUndefined(it: unknown): it is undefined;

// always false, use for plug
export declare function isAny<T>(it: unknown): it is T;
```

## advanced type guards
```ts
// reject invalid date object, NaN, null and undefined
export declare function isDefined<T>(it: T | null | undefined): it is T;
export declare function isPromise<T = any>(it: unknown): it is PromiseLike<T>;
// reject invalid date object
export declare function isDate(it: unknown): it is Date;
// alias for Yoda notation
export declare function isEqualTo<T extends boolean | keyof any>(it: T): (it: unknown) => it is T;
export declare function isEqualTo<T>(it: T): (it: unknown) => it is T;
// enumeration guards
export declare function isOneOf<T extends boolean | keyof any>(them: T[]): (it: unknown) => it is T;
export declare function isOneOf<T>(them: T[]): (it: unknown) => it is T;

// alias for incanceof operator
export declare function isInstanceOf<T>(type: new (...args: any[]) => T): (that: unknown) => that is T;

```


## string format guards
```ts
export declare function isNumberString(it: unknown): it is string;
export declare function isHexString(it: unknown): it is string;
export declare function isBase64String(it: unknown): it is string;
```

## collection guards
```ts
export declare function isArray<T = any>(it: unknown): it is T[];
export declare function isIterable<T = any>(it: unknown): it is Iterable<T>;
export declare function isAsyncIterable<T = any>(it: unknown): it is AsyncIterable<T>;
export declare function isArrayLike<T = any>(it: unknown): it is ArrayLike<T>;
```

## advanced collection guards
```ts
export declare function isArrayOf<T>(type: (it: unknown) => it is T): (it: unknown) => it is T[];
export declare function isRecordOf<T>(type: (it: unknown) => it is T): (it: unknown) => it is Record<string | number | symbol, T>;
```

## property guards
```ts
export declare function has<K extends keyof any, T = unknown>(key: K, is?: (it: unknown) => it is T): <P>(it: P) => it is P & Record<K, T>;
export declare function isKey(it: unknown): it is keyof any;
export declare function isKeyOf<T extends object>(it: T): (key: any) => key is keyof T;

// struct typing
export declare function isSimilarTo<T extends object>(it: {
    [K in keyof T]-?: (it: unknown) => it is T[K];
}): (that: unknown) => that is Pick<T, keyof T>;
```

## combinators
### or
Up to 10 type guards are supported.
```ts
export declare function or<T1, T2>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
): (it: unknown) => it is T1 | T2
export declare function or<T1, T2, T3>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
): (it: unknown) => it is T1 | T2 | T3
export declare function or<T1, T2, T3, T4>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
): (it: unknown) => it is T1 | T2 | T3 | T4
export declare function or<T1, T2, T3, T4, T5>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5
export declare function or<T1, T2, T3, T4, T5, T6>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6
export declare function or<T1, T2, T3, T4, T5, T6, T7>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6 | T7
export declare function or<T1, T2, T3, T4, T5, T6, T7, T8>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8
export declare function or<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
	f9: (it: unknown) => it is T9,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9
export declare function or<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
	f9: (it: unknown) => it is T9,
	f10: (it: unknown) => it is T10,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10
```
Example:
```ts
export const isNullableString = or(isString, isNull)
```

### and
Up to 10 type guards are supported.
```ts
export declare function and<T1, T2>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
): (it: unknown) => it is T1 & T2
export declare function and<T1, T2, T3>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
): (it: unknown) => it is T1 & T2 & T3
export declare function and<T1, T2, T3, T4>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
): (it: unknown) => it is T1 & T2 & T3 & T4
export declare function and<T1, T2, T3, T4, T5>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5
export declare function and<T1, T2, T3, T4, T5, T6>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6
export declare function and<T1, T2, T3, T4, T5, T6, T7>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6 & T7
export declare function and<T1, T2, T3, T4, T5, T6, T7, T8>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8
export declare function and<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
	f9: (it: unknown) => it is T9,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9
export declare function and<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
	f9: (it: unknown) => it is T9,
	f10: (it: unknown) => it is T10,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10
```
Example:
```ts
export const isSomeRecordType = isSimilarTo({
	str: isString,
	method: isFunction,
})
export const isAnotherRecordType = isSimilarTo({
	num: isNumber,
	map: isInstanceOf(Map),
})
export const isMixOfRecordTypes = and(isSomeRecordType, isAnotherRecordType)
```
### not
```ts
export declare function isNot<T>(type: (it: unknown) => it is T): <S>(that: T | S) => that is S;
```

## other
```ts
export declare function isBrowser(): boolean;
export declare function isNodeJS(): boolean;
```
