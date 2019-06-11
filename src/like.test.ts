import test from './test';
import { isLike, isNumber, isFunction } from './index';

class A {
  a = 0;
  method() {

  }
}

class B extends A {
  b = 0;
}


const isLikeA = isLike<A>({
  a: isNumber,
  method: isFunction,
});

const isLikeB = isLike<B>({
  a: isNumber,
  method: isFunction,
  b: isNumber,
});

const a = new A();
const b = new B();

const values = {
  a,
  b,
}

export default [
  ...test('like A', isLikeA, values, ['a', 'b']),
  ...test('like B', isLikeB, values, ['b']),
]