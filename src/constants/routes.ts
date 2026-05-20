export const USER_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password',
  INFO: '/info',
  EMAIL_DOMAINS: '/email-domains',
} as const;

export const ORDER_ROUTES = {
  ORDER: '/order',
  ORDER_BASKET: '/order-basket',
  ORDER_PAY: '/order-pay',
  ORDER_WAIT: '/order-wait',
  ORDER_COMPLETE: '/order-complete',
} as const;

export const ADMIN_ROUTES = {
  HOME: '/admin',
  MY_INFO: '/admin/my-info',
  REGISTER_ACCOUNT: '/admin/register-account',

  WORKSPACE: '/admin/workspace/:workspaceId',
  WORKSPACE_EDIT: '/admin/workspace/:workspaceId/edit',

  ORDER_REALTIME: '/admin/workspace/:workspaceId/order/realtime',
  TABLE_REALTIME: '/admin/workspace/:workspaceId/table/realtime',
  ORDER_STATISTICS: '/admin/workspace/:workspaceId/order/statistics',
  ORDER_TIMELINE: '/admin/workspace/:workspaceId/order-timeline',
  TOTAL_ORDER: '/admin/workspace/:workspaceId/total-order',

  PRODUCTS: '/admin/workspace/:workspaceId/products',
  PRODUCTS_CATEGORIES: '/admin/workspace/:workspaceId/products/categories',
} as const;

export const SUPER_ADMIN_ROUTES = {
  HOME: '/super-admin',
  WORKSPACE: '/super-admin/workspace',
  USER: '/super-admin/user',
  EMAIL: '/super-admin/email',
  BANK: '/super-admin/bank',
  DASHBOARD: '/super-admin/dashboard',
  ORDERS: '/super-admin/orders',
  ACCOUNT_STATUS: '/super-admin/account-status',
  FESTIVAL_CALENDAR: '/super-admin/festival-calendar',
  CACHE: '/super-admin/cache',
} as const;

export const TEST_ROUTES = {
  SENTRY_TEST: '/sentry-test',
} as const;

export const getAdminWorkspacePath = (workspaceId: string | number) => `/admin/workspace/${workspaceId}`;

export const getAdminProductsPath = (workspaceId: string | number) => `/admin/workspace/${workspaceId}/products`;

export function getSuperAdminOrdersPath(query?: { workspaceId?: number }): string {
  if (!query?.workspaceId) return SUPER_ADMIN_ROUTES.ORDERS;
  return `${SUPER_ADMIN_ROUTES.ORDERS}?workspaceId=${query.workspaceId}`;
}
