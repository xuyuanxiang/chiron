import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      file: 'index.js',
      format: 'cjs',
    },
    {
      dir: 'lib',
      file: 'index.esm.js',
      format: 'es',
    },
  ],
  external: ['path', 'assert', 'fs', 'events', 'util', 'os'],
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
};
