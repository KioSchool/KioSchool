import { sentryVitePlugin } from '@sentry/vite-plugin';
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    sentryVitePlugin({
      org: 'kioschool',
      project: 'kio-school',
      reactComponentAnnotation: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
