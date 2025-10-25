import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as Sentry from '@sentry/react';
import React from 'react';
import SentryErrorFallback from './components/common/fallback/SentryErrorFallback';
import axios from 'axios';

const environment = import.meta.env.VITE_ENVIRONMENT;

Sentry.init({
  dsn: 'https://a8801beae2acbe48fda784373f4603c3@o4509990064816128.ingest.us.sentry.io/4509990065995776',
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
  tracePropagationTargets: [
    /^https:\/\/.*\.kio-school\.com\/admin\//,
    /^https:\/\/.*\.kio-school\.com\/user\//,
    /^https:\/\/.*\.kio-school\.com\/super-admin\//,
  ],
  beforeSend(event, hint) {
    const error = hint.originalException;

    if (axios.isCancel(error)) {
      return null;
    }

    if (axios.isAxiosError(error)) {
      const isAuthError = error.response?.status === 401 || error.response?.status === 403;

      if (isAuthError) {
        return null;
      }
    }

    return event;
  },
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
