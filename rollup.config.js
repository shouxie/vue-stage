import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
export default {
  input: './src/index.js', // 打包入口
  output: {
    file: 'dist/vue.js',
    // 常见的格式 IIFE ESM CJS UMD（AMD+CJS）
    format: 'umd',
    name: 'Vue', // UMD模块需要配置name，会将导出的模块放到window上， 如果在node中使用 cjs，如果只是打包 webpack里面导入 esm模块  前端 script iife umd
    sourcemap: true,
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // glob 写法 
    })
  ]
}