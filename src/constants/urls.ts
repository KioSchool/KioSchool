const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

export const URLS = {
  API: {
    USER: API_BASE_URL,
    ADMIN: `${API_BASE_URL}/admin`,
    SUPER_ADMIN: `${API_BASE_URL}/super-admin`,
  },

  WS: WS_URL,

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
