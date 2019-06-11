
export interface Test {
  result: any,
  expected: any,
  message: string;
}

export default function test(type: string, guard: (input: any) => any, variables: object, expectedValues: string[]): Test[] {
  return Object.entries(variables).map(([name, value]) => {
    const expected = expectedValues.includes(name);
    return {
      result: guard(value),
      expected,
      message: `${name} ${expected ? 'is' : 'is not'} ${type}`,
    }
  })
}
