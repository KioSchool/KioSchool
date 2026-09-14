interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: 'local' | 'dev' | 'production';
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WS_URL: string;
  readonly VITE_GA_ID: string;
  readonly VITE_INSIGHT_CARD_ENABLED?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface TurnstileRenderOptions {
  sitekey: string;
  execution: 'render' | 'execute';
  appearance: 'always' | 'execute' | 'interaction-only';
  retry: 'auto' | 'never';
  callback: (token: string) => void;
  'error-callback': () => void;
  'timeout-callback': () => void;
  'unsupported-callback': () => void;
  'before-interactive-callback': () => void;
  'after-interactive-callback': () => void;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
  turnstile?: {
    render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
    execute: (widgetId: string) => void;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
  };
}
