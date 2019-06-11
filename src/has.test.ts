import { has, isNumber, isString } from './index';

const numberIndex = 0;
const stringIndex = 'string';
const symbolIndex = Symbol();

const temp = {
  [numberIndex]: 0,
  [stringIndex]: '',
  [symbolIndex]: {},
}

const hasNumberIndex = has(numberIndex);
const hasNumberIndexOfNumber = has(numberIndex, isNumber);
const hasNumberIndexOfString = has(numberIndex, isString);

const hasStringIndex = has(stringIndex);
const hasStringIndexOfNumber = has(stringIndex, isNumber);
const hasStringIndexOfString = has(stringIndex, isString);

const hasSymbolIndex = has(symbolIndex);
const hasSymbolIndexOfNumber = has(symbolIndex, isNumber);
const hasSymbolIndexOfString = has(symbolIndex, isString);

export default [
  { result: hasNumberIndex(temp), expected: true, message: 'has number index in temp' },
  { result: hasNumberIndexOfNumber(temp), expected: true, message: 'has number index of `number` type in temp' },
  { result: hasNumberIndexOfString(temp), expected: false, message: 'has number index of `string` type in temp' },
  { result: hasNumberIndex(null), expected: false, message: 'has number index in null' },
  { result: hasNumberIndexOfNumber(null), expected: false, message: 'has number index of `number` type in null' },
  { result: hasNumberIndexOfString(null), expected: false, message: 'has number index of `string` type in null' },

  { result: hasStringIndex(temp), expected: true, message: 'has string index in temp' },
  { result: hasStringIndexOfNumber(temp), expected: false, message: 'has string index of `number` type in temp' },
  { result: hasStringIndexOfString(temp), expected: true, message: 'has string index of `string` type in temp' },
  { result: hasStringIndex(Symbol()), expected: false, message: 'has string index in Symbol()' },
  { result: hasStringIndexOfNumber(Symbol()), expected: false, message: 'has string index of `number` type in Symbol()' },
  { result: hasStringIndexOfString(Symbol()), expected: false, message: 'has string index of `string` type in Symbol()' },

  { result: hasSymbolIndex(temp), expected: true, message: 'has string index in temp' },
  { result: hasSymbolIndexOfNumber(temp), expected: false, message: 'has string index of `number` type in temp' },
  { result: hasSymbolIndexOfString(temp), expected: false, message: 'has string index of `string` type in temp' },
  { result: hasSymbolIndex(Symbol()), expected: false, message: 'has string index in Symbol()' },
  { result: hasSymbolIndexOfNumber(Symbol()), expected: false, message: 'has string index of `number` type in Symbol()' },
  { result: hasSymbolIndexOfString(Symbol()), expected: false, message: 'has string index of `string` type in Symbol()' },
]