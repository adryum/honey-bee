import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { resolve, dirname } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
    server: {
        historyApiFallback: true,
    },
    plugins: [
        vue(),
        vueDevTools(),
        VueI18nPlugin({
            include: resolve(dirname(fileURLToPath(import.meta.url)), './src/core/locales/messages/**'),
        }),
        svgLoader({
            // Optional options:
            svgo: true,           // enable SVGO optimization
            svgoConfig: {},       // SVGO config object
            defaultImport: 'component' // import SVG as Vue component by default
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
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