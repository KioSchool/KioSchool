import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as Sentry from '@sentry/react';
import React from 'react';
import SentryErrorFallback from './components/common/fallback/SentryErrorFallback';
import { URLS } from '@constants/urls';

const environment = import.meta.env.VITE_ENVIRONMENT;

Sentry.init({
  dsn: URLS.SENTRY_DSN,
  environment: environment,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] }),
    Sentry.replayIntegration(),
  ],
  enableLogs: true,
  sendDefaultPii: true,
  replaysSessionSampleRate: environment === 'development' ? 0.5 : 0.2,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: environment === 'development' ? 0.3 : 0.2,
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
