import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as Sentry from '@sentry/react';
import React from 'react';
import SentryErrorFallback from './components/common/fallback/SentryErrorFallback';
import { URLS } from '@constants/urls';
import type { SentryEnvironment } from '@constants/sentry';
import { SENTRY_CONFIG } from '@constants/sentry';

const environment = import.meta.env.VITE_ENVIRONMENT as SentryEnvironment;
const gaId = import.meta.env.VITE_GA_ID;

const sentryRates = SENTRY_CONFIG.RATES_BY_ENV[environment] ?? SENTRY_CONFIG.RATES_BY_ENV.production;

if (gaId) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // @ts-ignore
    window.dataLayer.push(arguments);
  }
  // @ts-ignore
  gtag('js', new Date());
  // @ts-ignore
  gtag('config', gaId);
}

Sentry.init({
  dsn: URLS.SENTRY_DSN,
  environment,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.consoleLoggingIntegration({ levels: [...SENTRY_CONFIG.CONSOLE_LEVELS] }),
    Sentry.replayIntegration(),
  ],
  enableLogs: true,
  sendDefaultPii: true,
  ...sentryRates,
  tracePropagationTargets: URLS.SENTRY_TRACE_PROPAGATION_TARGETS,
});
export const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Sentry.ErrorBoundary fallback={() => <SentryErrorFallback />}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
);
