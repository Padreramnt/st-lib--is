export const base64Re = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
export const numberRe = /^([+-])?(\d+)(?:\.(\d+)?)?(?:[eE]([+-])?(\d+)?)?$/
export const partialNumberRe = /^\s*([+-])?(\d+)?(?:\.(\d+)?)?(?:[eE]([+-])?(\d+)?)?\s*$/
export const hexRe = /^[\dabcdef]*$/i
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
	return isString(it) && numberRe.test(it)
}
export function isPartialNumberString(it: unknown): it is string {
	return isString(it) && partialNumberRe.test(it)
}
export function isHexString(it: unknown): it is string {
	return isString(it) && hexRe.test(it)
}
export function isBase64String(it: unknown): it is string {
	return isString(it) && base64Re.test(it)
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

export function isEqualTo<T extends boolean | keyof any>(it: T): (it: unknown) => it is T
export function isEqualTo<T>(it: T): (it: unknown) => it is T
export function isEqualTo<T>(it: T) {
	return (that: unknown): that is T => Object.is(it, that)
}

export function isOneOf<T extends boolean | keyof any>(them: T[]): (it: unknown) => it is T
export function isOneOf<T>(them: T[]): (it: unknown) => it is T
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

declare var window: any
declare var document: any

const isDocument = isSimilarTo({
	nodeType: isEqualTo(9),
})

let _isBrowser: boolean
export function isBrowser() {
	try {
		if (null == _isBrowser) _isBrowser = isObject(window) && isDocument(document)
		return _isBrowser
	} catch (_) {
		return false
	}
}

declare var process: any

const isProcess = isSimilarTo({
	versions: isSimilarTo({
		node: isString
	})
})
let _isNodeJS: boolean
export function isNodeJS() {
	try {
		if (null == _isNodeJS) _isNodeJS = isProcess(process)
		return _isNodeJS
	} catch (_) {
		return false
	}
}

export function or<T1, T2>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
): (it: unknown) => it is T1 | T2
export function or<T1, T2, T3>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
): (it: unknown) => it is T1 | T2 | T3
export function or<T1, T2, T3, T4>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
): (it: unknown) => it is T1 | T2 | T3 | T4
export function or<T1, T2, T3, T4, T5>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5
export function or<T1, T2, T3, T4, T5, T6>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6
export function or<T1, T2, T3, T4, T5, T6, T7>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6 | T7
export function or<T1, T2, T3, T4, T5, T6, T7, T8>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
): (it: unknown) => it is T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8
export function or<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
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
export function or<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
export function or(...args: ((it: any) => any)[]) {
	return (it: unknown) => {
		for (const arg of args) if (arg(it)) return true
		return false
	}
}

export function and<T1, T2>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
): (it: unknown) => it is T1 & T2
export function and<T1, T2, T3>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
): (it: unknown) => it is T1 & T2 & T3
export function and<T1, T2, T3, T4>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
): (it: unknown) => it is T1 & T2 & T3 & T4
export function and<T1, T2, T3, T4, T5>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5
export function and<T1, T2, T3, T4, T5, T6>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6
export function and<T1, T2, T3, T4, T5, T6, T7>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6 & T7
export function and<T1, T2, T3, T4, T5, T6, T7, T8>(
	f1: (it: unknown) => it is T1,
	f2: (it: unknown) => it is T2,
	f3: (it: unknown) => it is T3,
	f4: (it: unknown) => it is T4,
	f5: (it: unknown) => it is T5,
	f6: (it: unknown) => it is T6,
	f7: (it: unknown) => it is T7,
	f8: (it: unknown) => it is T8,
): (it: unknown) => it is T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8
export function and<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
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
export function and<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
export function and(...args: ((it: any) => any)[]) {
	return (it: unknown) => {
		for (const arg of args) if (!arg(it)) return false
		return true
	}
}
