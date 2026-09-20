import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'eeaCronPicker',
      fileName: (format) => `eea-cron-picker.${format}.js`,
    },
    rollupOptions: {
      // Vue не включаем в бандл — пользователь подключит сам
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    // Очищаем dist перед сборкой
    emptyOutDir: true,
  },
})
