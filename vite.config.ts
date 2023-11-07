import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    outDir: ["./tingfeng-ui/lib/src"],
  }),],
  server: {
    port: 3000,
    open: "http://192.168.10.208:3000/",
    host: "0.0.0.0"
  }
})
