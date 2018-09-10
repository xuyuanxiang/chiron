import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import {join} from 'path';


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
    external: ['path', 'assert', 'os', 'fs', 'events', 'util'],
    plugins: [
      json(),
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        rollupCommonJSResolveHack: true,
        declarationDir: join(__dirname, 'lib'),
        typescript: require('typescript'),
      }),
      resolve({ browser: true }),
      commonjs(),
    ],
  }),
);
