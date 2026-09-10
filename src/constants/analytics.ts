export const GA_EVENT = {
  VIEW_ITEM_LIST: 'view_item_list',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  VIEW_CART: 'view_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  DONATION_CARD_VIEW: 'donation_card_view',
  DONATION_CARD_CLICK: 'donation_card_click',
  DONATION_CARD_DISMISS: 'donation_card_dismiss',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  WORKSPACE_CREATED: 'workspace_created',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  INQUIRY_SUBMITTED: 'inquiry_submitted',
  CTA_CLICK: 'cta_click',
} as const;

export type GaEventName = typeof GA_EVENT[keyof typeof GA_EVENT];

export const GA_CURRENCY = 'KRW';
