interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: 'development' | 'dev' | 'production';
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WS_URL: string;
  readonly VITE_GA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
