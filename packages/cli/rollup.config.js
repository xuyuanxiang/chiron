import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'cjs',
  },
  external: [
    'fs',
    'path',
    'os',
    'stream',
    'http',
    'https',
    'url',
    'zlib',
    'events',
    'child_process',
    'util',
    'dns',
  ],
  plugins: [
    json(),
    babel({
      include: 'src/**',
      exclude: [
        'node_modules/**',
        '**/__tests__/*.spec.ts',
        '**/__mocks__/*.ts',
      ],
    }),
    resolve(),
    commonjs({
      namedExports: {
        '../../node_modules/commander/index.js': ['name', 'parse', 'version'],
      },
      extensions: ['.ts', '.js'],
    }),
    production && terser(),
  ],
  experimentalCodeSplitting: true,
};
