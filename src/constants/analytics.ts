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
  INQUIRY_CAPTCHA_FAILED: 'inquiry_captcha_failed',
  CTA_CLICK: 'cta_click',
  ACQUISITION_SURVEY_VIEW: 'acquisition_survey_view',
  ACQUISITION_SURVEY_SKIPPED: 'acquisition_survey_skipped',
  ACQUISITION_SURVEY_ANSWERED: 'acquisition_survey_answered',
  TABLE_LAYOUT_VIEW: 'table_layout_view',
  TABLE_LAYOUT_EDIT_START: 'table_layout_edit_start',
  TABLE_LAYOUT_SAVED: 'table_layout_saved',
  TABLE_VIEW_SHOWN: 'table_view_shown',
  TABLE_SELECTED: 'table_selected',
  TABLE_SESSION_ACTION: 'table_session_action',
} as const;

export type GaEventName = typeof GA_EVENT[keyof typeof GA_EVENT];

/**
 * `TABLE_LAYOUT_VIEW`는 리스트→배치로 "전환하는 순간"에만 찍히므로 도입률(adoption)을 재는 값이지
 * 사용량이 아니다. 뷰 모드는 localStorage에 고착되어 한 번 바꾼 사용자는 다시 찍히지 않으니,
 * 사용량 비율 계산에는 `TABLE_VIEW_SHOWN`/`TABLE_SESSION_ACTION`만 쓴다.
 */
export const TABLE_LAYOUT_VIEW_SOURCE = {
  TOGGLE: 'toggle',
  PROMO_POPUP: 'promo_popup',
} as const;

export const TABLE_SESSION_ACTION = {
  START: 'start',
  END: 'end',
  EXTEND: 'extend',
  REDUCE: 'reduce',
} as const;

export type TableSessionAction = typeof TABLE_SESSION_ACTION[keyof typeof TABLE_SESSION_ACTION];

export const GA_CURRENCY = 'KRW';
