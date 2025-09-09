import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://a8801beae2acbe48fda784373f4603c3@o4509990064816128.ingest.us.sentry.io/4509990065995776',
  integrations: [Sentry.browserTracingIntegration(), Sentry.consoleLoggingIntegration({ levels: ['warn', 'error'] })],
  enableLogs: true,
  tracesSampleRate: 0.3,
  tracePropagationTargets: [
    /^https:\/\/.*\.kio-school\.com\/admin\//,
    /^https:\/\/.*\.kio-school\.com\/user\//,
    /^https:\/\/.*\.kio-school\.com\/super-admin\//,
  ],
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>,
);
