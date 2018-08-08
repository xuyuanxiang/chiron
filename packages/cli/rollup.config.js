import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/main.tsx',
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
    'webpack-serve',
    'assert',
  ],
  plugins: [
    json(),
    babel({
      include: 'src/**',
      exclude: ['node_modules/**', 'src/**/*.spec.ts'],
    }),
    resolve(),
    commonjs({
      extensions: ['.ts', '.js'],
    }),
  ],
  experimentalCodeSplitting: true,
};
