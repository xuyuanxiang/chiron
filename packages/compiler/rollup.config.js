import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

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
      file: 'index.js',
      format: 'cjs',
    },
  },
].map(it =>
  Object.assign(it, {
    input: 'src/index.ts',
    external: [
      'path',
      'assert',
      'fs',
      'events',
      'util',
      'crypto',
      'os',
      'chiron-core',
    ],
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
    ],
  }),
);
