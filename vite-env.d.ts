interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: 'local' | 'dev' | 'production';
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WS_URL: string;
  readonly VITE_GA_ID: string;
  readonly VITE_INSIGHT_CARD_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
