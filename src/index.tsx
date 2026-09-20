import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as Sentry from '@sentry/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SentryErrorFallback from './components/common/fallback/SentryErrorFallback';
import { URLS } from '@constants/urls';
import type { SentryEnvironment } from '@constants/sentry';
import { SENTRY_CONFIG } from '@constants/sentry';
import { isReportableError } from '@utils/sentryErrorFilter';
import { initAnalytics } from '@utils/analytics';
import { captureAcquisitionContext } from '@utils/acquisitionContext';
import { APP_SHELL_CLASS } from '@constants/appShell';

const environment = import.meta.env.VITE_ENVIRONMENT as SentryEnvironment;
const gaId = import.meta.env.VITE_GA_ID;

const sentryRates = SENTRY_CONFIG.RATES_BY_ENV[environment] ?? SENTRY_CONFIG.RATES_BY_ENV.production;

initAnalytics(gaId, environment);
captureAcquisitionContext();

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
  // 인터셉터를 우회해 전역 unhandled 경로로 잡히는 이벤트(예: 취소된 요청의 CanceledError,
  // 새어나온 예상 4xx)를 전송 직전에 드롭한다. 인터셉터와 동일한 판정 함수를 공유한다.
  beforeSend(event, hint) {
    if (!isReportableError(hint?.originalException)) {
      return null;
    }
    return event;
  },
});
export const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const rootElement = document.getElementById('root') as HTMLElement;
// 다른 경로에 폴백으로 내려온 프리렌더 랜딩 DOM은 React 첫 커밋 전에 비워 레이아웃과 메모리에서 뺀다.
if (document.documentElement.classList.contains(APP_SHELL_CLASS)) rootElement.replaceChildren();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Sentry.ErrorBoundary fallback={() => <SentryErrorFallback />}>
    <HelmetProvider>
      <BrowserRouter>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Sentry.ErrorBoundary>,
);
