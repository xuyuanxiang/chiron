import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      file: 'index.esm.js',
      format: 'es',
    },
    {
      dir: 'lib',
      file: 'index.js',
      format: 'cjs',
    },
  ],
  external: ['path', 'assert', 'fs', 'events', 'util', 'os'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      include: 'src/**',
    }),
    resolve(),
  ],
};
