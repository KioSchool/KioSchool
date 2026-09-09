export const GA_EVENT = {
  VIEW_ITEM_LIST: 'view_item_list',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_CART: 'view_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  WORKSPACE_CREATED: 'workspace_created',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  INQUIRY_SUBMITTED: 'inquiry_submitted',
  CTA_CLICK: 'cta_click',
  SIGNUP_ACQUISITION_STEP_VIEW: 'signup_acquisition_step_view',
  SIGNUP_ACQUISITION_SKIPPED: 'signup_acquisition_skipped',
} as const;

export type GaEventName = typeof GA_EVENT[keyof typeof GA_EVENT];

export const GA_CURRENCY = 'KRW';
