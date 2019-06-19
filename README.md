
# type checks

```ts
// null
isNull(null) // true

// bigint
isBigInt(BigInt('123')) // true

// boolean
isBoolean(true) // true
isBoolean(false) // true
isBoolean(Boolean()) // true
isBoolean(new Boolean()) // false

// function
isFunction(() => {}) // true
isFunction(async () => {}) // true
isFunction(function *() {return;}) // true
isFunction(new Function()) // true
isFunction({ call(){ } }) // false

// number
isNumber(0) // true
isNumber(Infinity) // true
isNumber(-Infinity) // true
isNumber(NaN) // false
isNumber(Number()) // true
isNumber(new Number()) // false

// object
isObject({}) // true
isObject(null) // false

// string
isString('') // true
isString(new String('')) // true

// string utility
isNumberString('') // false
isNumberString('0') // true
isNumberString('0.') // false
isNumberString('0.0') // true
isNumberString('01.0') // true
isNumberString('01.01') // true
isNumberString('+01.01') // true
isNumberString('-01.01') // true
isNumberString('+01e0') // true
isNumberString('+01e0') // true
isNumberString('-01e0') // true
isNumberString('+01e+0') // true
isNumberString('-01e-0') // true
isNumberString('+01.01e-0') // true
isNumberString('-01.01e-0') // true
isNumberString('+Infinity') // true
isNumberString('-Infinity') // true
isNumberString('+infinity') // false
isNumberString('-infinity') // false
isNumberString('abcdef') // false, use `isHexString`
isNumberString('123abcdef') // false, use `isHexString`

isHexString('') // false
isHexString('0') // true
isHexString('0abcdef') // true
isHexString('0abcdefg') // false

isBase64String('dGV4dCBiYXNlNjQgc3RyaW5n') // true
isBase64String('dGV4dCBiYXNlNjQgc3RyaW5nIA==') // true
isBase64String('dGV4dCBiYXNlNjQgc3RyaW5nICA=') // true

// symbol
isSymbol(Symbol()) // true

// undefined
isUndefined(undefined) // true
isUndefined(void 0) // true
isUndefined(null) // false
```

# utility
```ts

// instance of with additional type
isPromise(Promise.resolve()) // true
isPromise(Promise.reject()) // true
isPromise(new Promise(resolve => { /* */ resolve(); })) // true

isPromise({
  then() {

  },
  catch() {

  },
  finally() {

  },
}) // false, use `has('then', isFunction)`, `isProperty(it, 'then')` or `isLike`

isMap(new Map()) // true
isWeakMap(new WeakMap()) // true

isSet(new Set()) // true
isWeakSet(new WeakSet()) // true

isRegExp(/ /) // true
isRegExp(new RegExp(' ')) // true

// defined value
isDefined(undefined) // false
isDefined(null) // false
isDefined(NaN) // false
isDefined(new Date(NaN)) // false
isDefined('') // true
isDefined([]) // true
isDefined([null]) // true

// date
isDate(new Date()) // true
isDate(new Date(NaN)) // false
isDate('2019-06-19T11:22:25.275Z') // false
isDate('2019-06-19') // false
isDate(0) // false

// array
isArray // alias for `Array.isArray`, but allow pass type, see `isArrayOf`

isEqualTo // alias for `===`, see `isLike`
```

# properties
```ts

// has property without any type annotations, for more strong checks use `has('property', guard)`
isProperty({}, 'any') // false
isProperty({ any: null }, 'any') // true

// for scalar
isProperty('', 'trim') // true

// has
const hasProperty = has('property')
hasProperty({ }) // false
hasProperty({ property: null, }) // true
hasProperty({ property: undefined, }) // true
hasProperty({ property: NaN, }) // true
hasProperty({ property: new Date(NaN), }) // true

// has with type guard
const hasPropertyOfNumber = has('property', isNumber)
hasPropertyOfNumber({ }) // false
hasPropertyOfNumber({ property: 0, }) // true
hasPropertyOfNumber({ property: NaN, }) // false


isIterable // is alias for `has(Symbol.iterator, isFunction)`, just additionaly typed
isAsyncIterable // is alias for `has(Symbol.asyncIterator, isFunction)`, just additionaly typed
isArrayLike // is alias for `has('length', isNumber)`, just additionaly typed
```


# combinators
```ts
ifAny // combines guards into one single via `||`, see `isLike`
isKey // alias for `ifAny([isString, isNumber, isSymbol])`

ifAll // combines guards into one single via `&&`, see `isLike`
const isPromiseLike = ifAll([
  has('then', isFunction),
  has('catch', isFunction),
  has('finally', isFunction),
]) // see `isLike`
```

```ts
// alias for `Array#includes`, just typed
const isOneOfEnum = isOneOf(['1', '2', '3']);

const isKeyOfSomething = isKeyOf({ 0:0, })
isKeyOfSomething(0) // true
isKeyOfSomething('0') // true
isKeyOfSomething(1) // false


isArrayOf // alias for `Array#every`

// record
const isRecordOfStrings = isRecordOf(isString);
isRecordOfStrings({0: '', 'a': '', [Symbol()]: '' }) // true
isRecordOfStrings(['', '']) // true
isRecordOfStrings([]) // false
isRecordOfStrings({}) // false


class A {
  property: string|number;
  method() { }
}
const a = new A();

// instance of
const isInstanceOfA = isInstanceOf(A);

isInscanceOfA(a) // true

// is like
const isLikeA = isLike<A>({
  property: ifAny([isString, isNumber]),
  method: isFunction,
});

isInstanceOfA({
  property: '',
  method() {},
}); // false

isLikeA({
  property: '',
  method() {}
}) // true
```