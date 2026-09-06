import { matchPath } from 'react-router-dom';
import { ADMIN_ROUTES, ORDER_ROUTES, SUPER_ADMIN_ROUTES, TEST_ROUTES, USER_ROUTES } from '@constants/routes';

export const UNMATCHED_PAGE_PATH = '/(unmatched)';

const ALL_ROUTE_TEMPLATES: string[] = [
  ...Object.values(USER_ROUTES),
  ...Object.values(ORDER_ROUTES),
  ...Object.values(ADMIN_ROUTES),
  ...Object.values(SUPER_ADMIN_ROUTES),
  ...Object.values(TEST_ROUTES),
];

/** 쿼리스트링·동적 세그먼트를 제거하고 라우트 템플릿(`routes.ts` 상수)으로 정규화한다. */
export function normalizePagePath(pathname: string): string {
  const matchedTemplate = ALL_ROUTE_TEMPLATES.find((template) => matchPath(template, pathname) !== null);
  return matchedTemplate ?? UNMATCHED_PAGE_PATH;
}

export function extractAdminWorkspaceId(pathname: string): number | undefined {
  const templatesWithWorkspaceId = Object.values(ADMIN_ROUTES).filter((template) => template.includes(':workspaceId'));

  for (const template of templatesWithWorkspaceId) {
    const match = matchPath(template, pathname);
    const rawId = match?.params.workspaceId;
    if (rawId) {
      const id = Number(rawId);
      if (!Number.isNaN(id)) return id;
    }
  }

  return undefined;
}

export function extractGuestWorkspaceId(search: string): number | undefined {
  const id = Number(new URLSearchParams(search).get('workspaceId'));
  return id > 0 ? id : undefined;
}
