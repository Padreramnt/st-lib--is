const base64 = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
const number = /^[+-]?\d+(?:\.\d*)?(?:e[+-]?\d+)?$/i
const hex = /^[\dabcdef]*$/i
const hasIteratorMethod = has(Symbol.iterator, isFunction)
const hasAsyncIteratorMethod = has(Symbol.asyncIterator, isFunction)
const hasLengthNumber = has('length', isNumber)
const hasThenMethod = has('then', isFunction)

export function isNull(it: unknown): it is null {
	return it === null
}
export function isBigInt(it: unknown): it is bigint {
	return typeof it === 'bigint'
}
export function isBoolean(it: unknown): it is boolean {
	return typeof it === 'boolean'
}
export function isFunction(it: unknown): it is (...args: any[]) => any {
	return typeof it === 'function'
}
export function isConstructor(it: unknown): it is new (...args: any[]) => any {
	return typeof it === 'function'
}
export function isNumber(it: unknown): it is number {
	return (typeof it === 'number' || it instanceof Number) && !isNaN(+it)
}
export function isObject(it: unknown): it is object {
	return typeof it === 'object' && null != it
}
export function isRecord(it: unknown): it is Record<keyof any, any> {
	return isObject(it)
}
export function isString(it: unknown): it is string {
	return typeof it === 'string' || it instanceof String
}
export function isNumberString(it: unknown): it is string {
	return isString(it) && number.test(it)
}
export function isHexString(it: unknown): it is string {
	return isString(it) && hex.test(it)
}
export function isBase64String(it: unknown): it is string {
	return isString(it) && base64.test(it)
}
export function isSymbol(it: unknown): it is symbol {
	return typeof it === 'symbol'
}
export function isUndefined(it: unknown): it is undefined {
	return typeof it === 'undefined'
}
/**
 * always false
 */
export function isAny<T>(it: unknown): it is T
export function isAny() {
	return false
}

export function has<K extends keyof any, T = unknown>(key: K, is?: (it: unknown) => it is T): <P>(it: P) => it is P & Record<K, T>
export function has<K extends keyof any, T = unknown>(key: K, is?: (it: unknown) => it is T) {
	return (it: any): it is any => {
		return typeof it === 'object' && null != it && key in it && ((typeof is !== 'function') || is(it[key]))
	}
}

export function isNot<T>(type: (it: unknown) => it is T) {
	return <S>(that: S | T): that is S => !type(that)
}

export function isDefined<T>(it: T | null | undefined): it is T {
	return typeof it === 'number' || it instanceof Number || it instanceof Date ? !isNaN(+it) : null != it
}

export function isPromise<T = any>(it: unknown): it is PromiseLike<T> {
	return hasThenMethod(it)
}

export function isDate(it: unknown): it is Date {
	return it instanceof Date && !isNaN(+it)
}
export function isArray<T = any>(it: unknown): it is T[] {
	return Array.isArray(it)
}
export function isIterable<T = any>(it: unknown): it is Iterable<T> {
	return hasIteratorMethod(it)
}
export function isAsyncIterable<T = any>(it: unknown): it is AsyncIterable<T> {
	return hasAsyncIteratorMethod(it)
}
export function isArrayLike<T = any>(it: unknown): it is ArrayLike<T> {
	return hasLengthNumber(it)
}

export function isKey(it: unknown): it is keyof any {
	return isString(it) || isNumber(it) || typeof it === 'symbol'
}

export function isEqualTo<T extends boolean | keyof any>(it: T): (it: unknown) => T
export function isEqualTo<T>(it: T): (it: unknown) => T
export function isEqualTo<T>(it: T) {
	return (that: unknown): that is T => that === it
}

export function isOneOf<T extends boolean | keyof any>(them: T[]): (it: unknown) => T
export function isOneOf<T>(them: T[]): (it: unknown) => T
export function isOneOf<T>(them: T[]) {
	return (that: any): that is T => them.includes(that)
}
export function isKeyOf<T extends object>(it: T) {
	return (key: any): key is keyof T => typeof it === 'object' && null != it && key in it
}
export function isInstanceOf<T>(type: new (...args: any[]) => T) {
	return (that: unknown): that is T => that instanceof type
}
export function isArrayOf<T>(type: (it: unknown) => it is T) {
	return (it: unknown): it is T[] => isArray(it) && it.every(type)
}
export function isRecordOf<T>(type: (it: unknown) => it is T) {
	return (it: unknown): it is Record<keyof any, T> => {
		return isRecord(it) && Reflect.ownKeys(it).every(k => type(Reflect.get(it, k)))
	}
}

export function isSimilarTo<T extends object>(it: { [K in keyof T]-?: (it: unknown) => it is T[K] }) {
	return (that: unknown): that is Pick<T, keyof T> => {
		return isObject(that) && Reflect.ownKeys(it).every(k => Reflect.get(it, k)(Reflect.get(that, k)))
	}
}

export function isCallable<A extends any[], T>(constructor: true): (it: unknown) => it is new (...args: A) => T
export function isCallable<A extends any[], T>(): (it: unknown) => it is (...args: A) => T
export function isCallable(): any {
	return isFunction
}
