const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

const API_BASE_URL = 'https://api.kio-school.com';
const WS_PROTOCOL = IS_DEVELOPMENT ? 'http' : 'wss';
const WS_HOST = IS_DEVELOPMENT ? 'localhost:8080' : 'api.kio-school.com';

export const URLS = {
  API: {
    USER: IS_DEVELOPMENT ? '/api' : API_BASE_URL,
    ADMIN: IS_DEVELOPMENT ? '/api/admin' : `${API_BASE_URL}/admin`,
    SUPER_ADMIN: IS_DEVELOPMENT ? '/api/super-admin' : `${API_BASE_URL}/super-admin`,
  },

  WS: `${WS_PROTOCOL}://${WS_HOST}${IS_DEVELOPMENT ? '/api' : ''}/ws`,

  EXTERNAL: {
    NOTION_FAQ: 'https://ji-in.notion.site/FAQ-09eb07eac4a34ab4aa883727994e0b08?pvs=4',
    INSTAGRAM: 'https://www.instagram.com/kioschool/',
    YOUTUBE: 'https://www.youtube.com/watch?v=4tZjnj48hBk',
    KIO_SCHOOL: 'https://kio-school.com',
  },

  SENTRY_DSN: 'https://a8801beae2acbe48fda784373f4603c3@o4509990064816128.ingest.us.sentry.io/4509990065995776',
  SENTRY_TRACE_PROPAGATION_TARGETS: [
    /^https:\/\/.*\.kio-school\.com\/admin\//,
    /^https:\/\/.*\.kio-school\.com\/user\//,
    /^https:\/\/.*\.kio-school\.com\/super-admin\//,
  ],
};
