import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    outDir: ["./t-arcgis/lib/src"],
  }),],
  server: {
    port: 3000,
    open: "http://192.168.10.208:3000/",
    host: "0.0.0.0"
  },
  build: {
    minify: 'terser', // 压缩代码
    chunkSizeWarningLimit: 1000, // 超过1000kb的文件将会被提示
    cssCodeSplit: true, //将css文件单独打包
    outDir: "t-arcgis", //输出文件名称
    commonjsOptions: {
      exclude: ['./public/**'],
    },
    lib: {
      entry: "./packages/index.ts", //指定组件编译入口文件
      name: "t-arcgis", //指定组件库的名称
      // fileName: "index",
      fileName: `index`
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue", "loadsh", "@arcgis/core"],
      input: [path.resolve(__dirname, "packages/index.ts")],
      output: {
        format: "es",
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
        assetFileNames: '[ext]/[name].[ext]',
        // 将构建好的文件输出到这里
        dir: path.resolve(__dirname, "t-arcgis/lib"),
      },
    },
    terserOptions: { // 在打包代码时移除 console、debugger 和 注释
      compress: {
        drop_console: true, // 生产环境时移除console
        drop_debugger: true
      },
      format: {
        comments: false // 删除注释comments
      }
    }
  },
})
