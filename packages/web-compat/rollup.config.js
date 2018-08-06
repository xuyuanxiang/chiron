import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      file: 'index.js',
      format: 'es',
    },
    {
      dir: 'lib',
      file: 'index.cjs.js',
      format: 'cjs',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      include: 'src/**',
    }),
    resolve(),
    commonjs({
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    }),
  ],
};
