import { defineConfig } from 'vite'
import path from 'path';


export default defineConfig({
    root: 'src',
    css: {
        preprocessorOptions: {
            scss: {
                //additionalData: `@import "./src/assets/styles/main.scss";`
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: '../dist'
    },
    server: {
        port: 3000
    }
})