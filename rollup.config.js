import typescript from 'rollup-plugin-typescript';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './lib/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './lib/index.mjs',
        format: 'es',
        sourcemap: true,
      }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      })
    ]
  },
]