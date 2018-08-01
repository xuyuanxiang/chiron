import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default [
  {
    output: {
      dir: 'lib',
      file: 'index.esm.js',
      format: 'es',
    },
  },
  {
    output: {
      dir: 'lib',
      file: 'index.cjs.js',
      format: 'cjs',
    },
  },
].map(it =>
  Object.assign(it, {
    input: 'src/index.ts',
    external: ['path', 'assert', 'fs', 'events', 'util'],
    plugins: [
      json(),
      babel({
        exclude: 'node_modules/**',
        include: 'src/**',
      }),
      resolve(),
      commonjs({
        extensions: ['.ts', '.js'],
      }),
      production && terser(),
    ],
  }),
);
