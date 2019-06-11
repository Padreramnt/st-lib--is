export type Is<T> = (it: unknown) => it is T;

const base64 = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
const hasIteratorFunction = has(Symbol.iterator, isFunction);
const hasAsyncIteratorFunction = has(Symbol.asyncIterator, isFunction);
const hasLengthNumber = has('length', isNumber);


export function isProperty(it: unknown, key: unknown) {
  return isKey(key) && (
    (typeof it === 'object' && null != it && key in it)
    || (null != it && Object.prototype.hasOwnProperty.call(it, key))
  );
}

export function has<K extends string | number | symbol, T = unknown>(key: K, is?: Is<T>) {
  return (it: any): it is Record<K, T> => {
    return isProperty(it, key) && ((typeof is !== 'function') || is(it[key]));
  };
};
export function isNull(it: unknown): it is null {
  return it === null;
}
export function isBigInt(it: unknown): it is bigint {
  return typeof it === 'bigint';
}
export function isBoolean(it: unknown): it is boolean {
  return typeof it === 'boolean';
}
export function isFunction(it: unknown): it is ((...args: any[]) => any) {
  return typeof it === 'function';
}
export function isNumber(it: unknown): it is number {
  return typeof it === 'number' && !isNaN(it);
}
export function isObject(it: unknown): it is object {
  return typeof it === 'object' && null != it;
}
export function isString(it: unknown): it is string {
  return typeof it === 'string';
}
export function isBase64(it: unknown): it is string {
  return isString(it) && base64.test(it);
}
export function isSymbol(it: unknown): it is symbol {
  return typeof it === 'symbol';
}
export function isUndefined(it: unknown): it is undefined {
  return typeof it === 'undefined';
}
export function isPromise<T = any>(it: unknown): it is Promise<T> {
  return it instanceof Promise;
}
export function isMap<K = any, V = any>(it: unknown): it is Map<K, V> {
  return it instanceof Map;
}
export function isWeakMap<K extends object = object, V = any>(it: unknown): it is WeakMap<K, V> {
  return it instanceof WeakMap;
}
export function isSet<K = any>(it: unknown): it is Set<K> {
  return it instanceof Set;
}
export function isWeakSet<K extends object = object>(it: unknown): it is WeakSet<K> {
  return it instanceof WeakSet;
}
export function isDefined<T>(it: T | null | undefined): it is T {
  return typeof it === 'number' ? !isNaN(it) : null != it;
}
export function isDate(it: unknown): it is Date {
  return it instanceof Date && !isNaN(+it);
}
export function isRegExp(it: unknown): it is RegExp {
  return it instanceof RegExp;
}

export function isArray<T = any>(it: unknown): it is T[] {
  return Array.isArray(it);
}
export function isIterable<T = any>(it: unknown): it is Iterable<T> {
  return hasIteratorFunction(it);
}
export function isAsyncIterable<T = any>(it: unknown): it is AsyncIterable<T> {
  return hasAsyncIteratorFunction(it);
}
export function isArrayLike<T = any>(it: unknown): it is ArrayLike<T> {
  return hasLengthNumber(it);
}

export function ifAny<a, b, c, d, e, f, g>(input: [Is<a>, Is<b>, Is<c>, Is<d>, Is<e>, Is<f>, Is<g>,]): Is<a | b | c | d | e | f | g>;
export function ifAny<a, b, c, d, e, f>(input: [Is<a>, Is<b>, Is<c>, Is<d>, Is<e>, Is<f>,]): Is<a | b | c | d | e | f>;
export function ifAny<a, b, c, d, e>(input: [Is<a>, Is<b>, Is<c>, Is<d>, Is<e>,]): Is<a | b | c | d | e>;
export function ifAny<a, b, c, d>(input: [Is<a>, Is<b>, Is<c>, Is<d>,]): Is<a | b | c | d>;
export function ifAny<a, b, c>(input: [Is<a>, Is<b>, Is<c>,]): Is<a | b | c>;
export function ifAny<a, b>(input: [Is<a>, Is<b>,]): Is<a | b>;
export function ifAny(input: Is<any>[]) {
  return (it: unknown) => input.some(is => is(it));
};

export function ifAll<a, b, c, d, e, f, g>(input: [Is<a>, Is<b>, Is<c>, Is<d>, Is<e>, Is<f>, Is<g>,]): Is<a & b & c & d & e & f & g>;
export function ifAll<a, b, c, d, e, f>(input: [Is<a>, Is<b>, Is<c>, Is<d>, Is<e>, Is<f>,]): Is<a & b & c & d & e & f>;
export function ifAll<a, b, c, d, e>(input: [Is<a>, Is<b>, Is<c>, Is<d>, Is<e>,]): Is<a & b & c & d & e>;
export function ifAll<a, b, c, d>(input: [Is<a>, Is<b>, Is<c>, Is<d>,]): Is<a & b & c & d>;
export function ifAll<a, b, c>(input: [Is<a>, Is<b>, Is<c>,]): Is<a & b & c>;
export function ifAll<a, b>(input: [Is<a>, Is<b>,]): Is<a & b>;
export function ifAll(input: Is<any>[]) {
  return (it: unknown) => input.every(is => is(it));
};

export const isKey = ifAny([isString, isNumber, isSymbol]);
export function isOneOf<T>(input: T[]) {
  return (it: any): it is T => input.includes(it);
};
export function isKeyOf<T>(input: T) {
  return (it: any): it is keyof T => (typeof input === 'object' && it in input) || null != it && Object.prototype.hasOwnProperty.call(input, it);
};
export function isInstanceOf<T>(input: new (...args: any[]) => T) {
  return (it: unknown): it is T => it instanceof input;
};
export function isArrayOf<T>(is: (it: unknown) => it is T) {
  return (it: unknown): it is T[] => isArray(it) && it.every(is);
};
export function isRecordOf<T>(is: (it: unknown) => it is T) {
  return (it: unknown): it is Record<string | number | symbol, T> => isObject(it) && Object.values(it).every(is);
};
export type Shape<T extends Record<PropertyKey, any>> = {
  [K in keyof T]-?: Is<T[K]>
}
export function isLike<T extends Record<PropertyKey, any>>(shape: Shape<T>) {
  const conditions: ((input: any) => any)[] = [];
  for (const key of Reflect.ownKeys(shape)) {
    const is = Reflect.get(shape, key);
    if (isFunction(is)) { conditions.push(it => isProperty(it, key) && is(it[key])) }
    else throw new TypeError(`guard ${String(key)} must be a function, got ${typeof is}`);
  }
  return (it: unknown): it is Pick<T, keyof T> => isObject(it) && conditions.every(is => is(it));
};
