import {
  isObject,
  isNumber,
  isString,
  isSymbol,
  isBigInt,
  isFunction,
  isUndefined,
  isNull,
  isBoolean,
  isDate,
  isPromise,
  isArray,
  isArrayLike,
  isWeakMap,
  isMap,
  isSet,
  isWeakSet,
  isDefined,
  isRegExp
} from './index';
import test from './test';

const number = 0;
const numberObject = new Number();
const invalidNumber = Number('invalid number');
const string = '';
const stringObject = new String('');
const symbol = Symbol();
const bigint = BigInt('12345');
const arrowFunction = () => { };
function declaratedFunction() { };
function* generatorFunction() { yield };
async function asyncFunction() { return };
const constructedFunction = new Function('');
const object = {};
const date = new Date();
const invalidDate = new Date('invalid date');

const promise = Promise.resolve();


const undefinedValues = {
  null: null,
  undefined: void 0,
  invalidNumber,
}

const primitiveValues = {
  number,
  string,
  true: true,
  false: false,
  symbol,
  bigint,
}
const functionValues = {
  arrowFunction,
  declaratedFunction,
  constructedFunction,
  asyncFunction,
  generatorFunction,
}

const objectValues = {
  object,
  regexp: /regexp/,
  stringObject,
  numberObject,
  trueObject: new Boolean(true),
  falseObject: new Boolean(false),
  date,
  invalidDate,
  promise,
  array: [],
  map: new Map(),
  set: new Set(),
  weakMap: new WeakMap(),
  weakSet: new WeakSet(),
  arrayLike: { length: 0 },
}

const definedValues = {
  ...primitiveValues,
  ...functionValues,
  ...objectValues,
}

const values = {
  ...undefinedValues,
  ...definedValues,
}

export default [
  ...test('null'.toLowerCase(), isNull, values, ['null']),
  ...test('bigInt'.toLowerCase(), isBigInt, values, ['bigint']),
  ...test('boolean'.toLowerCase(), isBoolean, values, ['true', 'false']),
  ...test('function'.toLowerCase(), isFunction, values, Object.keys(functionValues)),
  ...test('number'.toLowerCase(), isNumber, values, ['number']),
  ...test('object'.toLowerCase(), isObject, values, Object.keys(objectValues)),
  ...test('string'.toLowerCase(), isString, values, ['string']),
  ...test('symbol'.toLowerCase(), isSymbol, values, ['symbol']),
  ...test('undefined'.toLowerCase(), isUndefined, values, ['undefined']),
  // defined
  ...test('defined', isDefined, values, Object.keys(definedValues)),
  // special
  ...test('instance of RegExp', isRegExp, values, ['regexp']),
  ...test('instance of Date', isDate, values, ['date']),
  ...test('instance of Promise', isPromise, values, ['promise']),
  ...test('instance of Array', isArray, values, ['array']),
  ...test('ArrayLike', isArrayLike, values, [...Object.keys(functionValues), 'arrayLike', 'array', 'string', 'stringObject']),
  ...test('instance of Map', isMap, values, ['map']),
  ...test('instance of WeakMap', isWeakMap, values, ['weakMap']),
  ...test('instance of Set', isSet, values, ['set']),
  ...test('instance of WeakSet', isWeakSet, values, ['weakSet']),
]