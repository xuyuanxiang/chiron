import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

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
    external: [
      'path',
      'assert',
      'fs',
      'events',
      'util',
      'querystring',
      'vue-loader',
      'vue-loader/lib/plugin',
      'vue-template-compiler',
      'vue-style-loader',
      'vue',
      'webpack-chain',
    ],
    plugins: [
      json(),
      babel({
        exclude: 'node_modules/**',
        include: 'src/**',
      }),
      resolve(),
      typescript({
        exclude: 'node_modules/**',
        include: 'src/**',
        typescript: require('typescript'),
      }),
      commonjs({
        extensions: ['.ts', '.js'],
      }),
    ],
  }),
);
