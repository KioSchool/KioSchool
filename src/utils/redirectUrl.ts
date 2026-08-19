import { USER_ROUTES } from '@constants/routes';

export const REDIRECT_URL_PARAM = 'redirectUrl';

export const sanitizeRedirectUrl = (raw: string | null | undefined): string | null => {
  if (!raw) return null;
  if (!raw.startsWith('/') || raw.startsWith('//')) return null;

  const path = raw.split('?')[0].split('#')[0];
  if (path === USER_ROUTES.LOGIN) return null;

  return raw;
};
