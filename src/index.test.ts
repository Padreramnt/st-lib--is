import type from './type.test';
import has from './has.test';
import like from './like.test';

const tests = [
  ...type,
  ...has,
  ...like,
]

function print(test: { result: any, expected: any, message: string }, pass: string = 'pass', fail: string = 'fail') {
  if (test.result === test.expected) {
    console.log(`%s (\x1b[32m%s\x1b[0m)`, test.message, pass);
  } else {
    console.log(`%s (\x1b[31m%s\x1b[0m);\nexpected: %O\nreceived: %O`, test.message, fail, test.expected, test.result);
  }
}

tests.forEach(it => print(it));

const passed = tests.filter(it => it.result === it.expected).length;
const failed = tests.length - passed;

console.log(`passed: \x1b[32m%s\x1b[0m\nfailed: \x1b[31m%s\x1b[0m`, passed, failed)

if (failed) {
  process.exit(1);
}