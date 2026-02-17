/// <reference types="vite/client" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@application': path.resolve(__dirname, './src/application'),
      '@features': path.resolve(__dirname, './src/features'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@components': path.resolve(__dirname, './src/components'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    exclude: [...configDefaults.exclude, 'tests-e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/**', 'dist/**', 'src/test/**', '**/*.d.ts', 'test/mocks/**'],
      thresholds: {
        lines: 40,
        functions: 40,
        branches: 30,
        statements: 40,
      },
    },
  },
});
