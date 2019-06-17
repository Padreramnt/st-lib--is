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
  isRegExp,
  isLike,
  isInstanceOf,
  isOneOf,
  isArrayOf,
  isRecordOf
} from './lib/index.mjs';

function test(type, guard, variables, expectedValues) {
  return Object.entries(variables).map(([name, value]) => {
    const expected = expectedValues.includes(name);
    return {
      result: guard(value),
      expected,
      message: `${name} ${expected ? 'is' : 'is not'} ${type}`,
    }
  })
}

class A {
  a = 0;
  method() {

  }
}

class B extends A {
  b = 0;
}


const duckAObject = {
  a: 0,
  method() { },
}

const duckBObject = {
  a: 0,
  b: 0,
  method() { },
}

const isLikeA = isLike({
  a: isNumber,
  method: isFunction,
});

const isLikeB = isLike({
  a: isNumber,
  method: isFunction,
  b: isNumber,
});

const isInstanceOfA = isInstanceOf(A);
const isInstanceOfB = isInstanceOf(B);


const number = -1;
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
const cunstructedAObject = new A();
const cunstructedBObject = new B();
const promise = Promise.resolve();
const arrayLike = { length: 1, 0: {} };

const recordOfStrings = {
  [0]: '',
  ['a']: '',
  [Symbol()]: '',
}

const arrayOfObjects = [object];

const isArrayOfObjects = isArrayOf(isObject);
const isRecordOfStrings = isRecordOf(isString);

const enumValuesList = [0, 1, 2];
const enumValue = enumValuesList[1];
const isOneOfEnumValueList = isOneOf(enumValuesList);

const undefinedValues = {
  null: null,
  undefined: void 0,
  invalidNumber,
  invalidDate,
}

const primitiveValues = {
  number,
  string,
  true: true,
  false: false,
  symbol,
  bigint,
  enumValue,
}
const functionValues = {
  arrowFunction,
  declaratedFunction,
  constructedFunction,
  asyncFunction,
  generatorFunction,
}

const likeBValues = {
  cunstructedBObject,
  duckBObject,
}

const likeAValues = {
  cunstructedAObject,
  duckAObject,
  ...likeBValues,
}

const arrayValues = {
  array: [],
  arrayOfObjects,
  enumValuesList,
}

const arrayLikeValues = {
  ...arrayValues,
  ...functionValues,
  arrayLike,
  string,
  stringObject,
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
  map: new Map([[1, 1]]),
  set: new Set([1]),
  weakMap: new WeakMap([[object, 1]]),
  weakSet: new WeakSet([object]),
  arrayLike: { length: 1, 0: {} },
  recordOfStrings,
  ...arrayValues,
  ...likeAValues,
  ...likeBValues,
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

const undefinedValueNames = Object.keys(undefinedValues);
const definedValueNames = Object.keys(definedValues).filter(it => !undefinedValueNames.includes(it));

// unnessary to test has, isProperty, isKey, isKeyOf, ifAny cos of it used by isArrayLike & isLike

const tests = [
  ...test('null'.toLowerCase(), isNull, values, ['null']),
  ...test('bigInt'.toLowerCase(), isBigInt, values, ['bigint']),
  ...test('boolean'.toLowerCase(), isBoolean, values, ['true', 'false']),
  ...test('function'.toLowerCase(), isFunction, values, Object.keys(functionValues)),
  ...test('number'.toLowerCase(), isNumber, values, ['number', 'enumValue']),
  ...test('object'.toLowerCase(), isObject, values, Object.keys(objectValues)),
  ...test('string'.toLowerCase(), isString, values, ['string']),
  ...test('symbol'.toLowerCase(), isSymbol, values, ['symbol']),
  ...test('undefined'.toLowerCase(), isUndefined, values, ['undefined']),
  // defined
  ...test('defined', isDefined, values, definedValueNames),
  // special
  ...test('instance of RegExp', isRegExp, values, ['regexp']),
  ...test('instance of Date', isDate, values, ['date']),
  ...test('instance of Promise', isPromise, values, ['promise']),
  ...test('instance of Array', isArray, values, Object.keys(arrayValues)),
  ...test('ArrayLike', isArrayLike, values, Object.keys(arrayLikeValues)),
  ...test('instance of Map', isMap, values, ['map']),
  ...test('instance of WeakMap', isWeakMap, values, ['weakMap']),
  ...test('instance of Set', isSet, values, ['set']),
  ...test('instance of WeakSet', isWeakSet, values, ['weakSet']),
  // like
  ...test('like A', isLikeA, values, Object.keys(likeAValues)),
  ...test('like B', isLikeB, values, Object.keys(likeBValues)),
  ...test('instance of A', isInstanceOfA, values, ['cunstructedAObject', 'cunstructedBObject']),
  ...test('instance of B', isInstanceOfB, values, ['cunstructedBObject']),
  // collection
  ...test(`one of enumValueList`, isOneOfEnumValueList, values, ['enumValue']),
  ...test('array of objects', isArrayOfObjects, values, ['array', 'arrayOfObjects']),
  ...test('record of strings', isRecordOfStrings, values, ['recordOfStrings']),
]

function print(test, pass = 'pass', fail = 'fail') {
  if (test.result === test.expected) {
    console.log(`%s (\x1b[32m%s\x1b[0m)`, test.message, pass);
  } else {
    console.log(`%s (\x1b[31m%s\x1b[0m);\nexpected: %O\nreceived: %O`, test.message, fail, test.expected, test.result);
  }
}

tests.forEach(it => print(it));

const passed = tests.filter(it => it.result === it.expected).length;
const failed = tests.length - passed;

console.log(`passed: \x1b[32m%s\x1b[0m\nfailed: \x1b[31m%s\x1b[0m`, passed, failed);

if (failed) {
  process.exit(1);
}