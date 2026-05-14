import { sentryVitePlugin } from '@sentry/vite-plugin';
/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

const EMOTION_SERVER_ALIASES = [
  { find: /^@emotion\/react$/, replacement: path.resolve(__dirname, 'node_modules/@emotion/react/dist/emotion-react.esm.js') },
  { find: /^@emotion\/styled$/, replacement: path.resolve(__dirname, 'node_modules/@emotion/styled/dist/emotion-styled.esm.js') },
  { find: /^@emotion\/styled\/base$/, replacement: path.resolve(__dirname, 'node_modules/@emotion/styled/base/dist/emotion-styled-base.esm.js') },
  {
    find: /^@emotion\/use-insertion-effect-with-fallbacks$/,
    replacement: path.resolve(__dirname, 'node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js'),
  },
];

export default defineConfig({
  resolve: {
    alias: EMOTION_SERVER_ALIASES,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    ...vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      additionalPrerenderRoutes: ['/info'],
    }),
    sentryVitePlugin({
      org: 'kioschool',
      project: 'kio-school',
      reactComponentAnnotation: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
