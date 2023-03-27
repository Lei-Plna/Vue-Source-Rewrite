/**
 * rollup 本身是无法将 ES6 模块语法转换成 CommonJS 规范的，所以需要借助 rollup-plugin-commonjs 插件
 * rollup 本身是只能处理 ES6 模块语法, 通过rollup-plugin-commonjs可以更好的处理commonjs模块
 */
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  // 入口文件
  input: './src/index.js',
  // 出口文件
  output: {
    // 生成的文件格式
    format: 'umd',
    // 生成的文件名
    file: 'dist/umd/vue.js',
    // 指定打包后的全局变量名
    name: 'Vue',
    // 是否生成sourcemap文件
    sourcemap: true,
  },
  plugins: [
    // babel插件可以将ES6语法转换成ES5语法
    babel({
      exclude: 'node_modules/**',
    }),
    // commonjs插件可以将commonjs模块转换成ES6模块
    commonjs(),
    // serve插件可以将打包后的文件在浏览器中打开
    serve({
      open: true,
      openPage: '/index.html',
      port: 3000,
      contentBase: '',
    }),
  ],
};
