import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({
        // Optional options:
        svgo: true,           // enable SVGO optimization
        svgoConfig: {},       // SVGO config object
        defaultImport: 'component' // import SVG as Vue component by default
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        // This injects the import into every SASS file/block
        // additionalData: `\n@use "@/assets/_mixins.sass" as *\n` 
      },
    }
  }
})