import { sentryVitePlugin } from '@sentry/vite-plugin';
/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
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

const PREVIEW_PROXY_PREFIXES = ['/api'];
const ORIGINAL_PREVIEW_URL = '__kioschoolOriginalPreviewUrl';

// vite 는 configurePreviewServer 훅을 내장 프록시보다 먼저 실행한다. 그 사이 vite-prerender-plugin 이
// 확장자 없는 req.url 을 /index.html 로 바꿔버려, preview 에서 /api/* 가 프록시에 닿지 못한다.
function capturePreviewUrl(): Plugin {
  return {
    name: 'kioschool:capture-preview-url',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        (req as unknown as Record<string, unknown>)[ORIGINAL_PREVIEW_URL] = req.url;
        next();
      });
    },
  };
}

function restorePreviewProxyUrl(): Plugin {
  return {
    name: 'kioschool:restore-preview-proxy-url',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const originalUrl = (req as unknown as Record<string, unknown>)[ORIGINAL_PREVIEW_URL];
        const isProxied = typeof originalUrl === 'string' && PREVIEW_PROXY_PREFIXES.some((prefix) => originalUrl.startsWith(prefix));

        if (isProxied) req.url = originalUrl as string;
        next();
      });
    },
  };
}

export default defineConfig({
  resolve: {
    alias: EMOTION_SERVER_ALIASES,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    capturePreviewUrl(),
    ...vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
      additionalPrerenderRoutes: ['/info'],
    }),
    restorePreviewProxyUrl(),
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
  preview: {
    port: 3000,
    strictPort: true,
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
