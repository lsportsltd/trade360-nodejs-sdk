import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@entities': './src/entities/core-entities',
      '@utilities': './src/utilities',
      '@logger': './src/logger',
      '@feed': './src/feed',
      '@lsports/errors': './src/entities/errors',
      '@api': './src/api',
      // Add other aliases as needed
    };
  },
}); 