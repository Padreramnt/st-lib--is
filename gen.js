
const declareOrFn = (t, f) => `export function or<${t.join(', ')}>(
	${f.join('\n\t')}
): (it: unknown) => it is ${t.join(' | ')}`

const declareAndFn = (t, f) => `export function and<${t.join(', ')}>(
	${f.join('\n\t')}
): (it: unknown) => it is ${t.join(' & ')}`

const declareFn = (n, format, minArgs = 2) => {
	const t = []
	const f = []
	for (let i = 0; i <= n + 1; i++) {
		t.push(`T${i + 1}`)
		f.push(`f${i + 1}: (it: unknown) => it is T${i + 1},`)
	}
	return format(t, f)
}

const orDeclarations = []
const andDeclarations = []


for (let i = 0; i < +(process.argv[2] || 10) - 1; i++) {
	orDeclarations.push(declareFn(i, declareOrFn))
	andDeclarations.push(declareFn(i, declareAndFn))
}

console.log(`
${orDeclarations.join('\n')}
export function or(...args: ((it: any) => any)[]) {
	return (it: unknown) => {
		for (const arg of args) if (arg(it)) return true
		return false
	}
}

${andDeclarations.join('\n')}
export function and(...args: ((it: any) => any)[]) {
	return (it: unknown) => {
		for (const arg of args) if (!arg(it)) return false
		return true
	}
}
`)
