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
  ORDER_PAY_CONFIRM: 'order_pay_confirm',
  ORDER_PAY_UNDO: 'order_pay_undo',
  ORDER_CARD_OPEN: 'order_card_open',
  PRODUCT_SUMMARY_OPEN: 'product_summary_open',
  PRODUCT_SUMMARY_ROW_OPEN: 'product_summary_row_open',
  DEMO_STEP: 'demo_step',
  DEMO_STEP_DONE: 'demo_step_done',
  DEMO_ACTION: 'demo_action',
  DEMO_LEAVE: 'demo_leave',
  DEMO_COMPLETE: 'demo_complete',
} as const;

export type GaEventName = typeof GA_EVENT[keyof typeof GA_EVENT];

/**
 * `TABLE_LAYOUT_VIEW`는 리스트→배치로 "전환하는 순간"에만 찍히므로 도입률(adoption)을 재는 값이지
 * 사용량이 아니다. 뷰 모드는 localStorage에 고착되어 한 번 바꾼 사용자는 다시 찍히지 않으니,
 * 사용량 비율 계산에는 `TABLE_VIEW_SHOWN`/`TABLE_SESSION_ACTION`만 쓴다.
 */
export const TABLE_LAYOUT_VIEW_SOURCE = {
  TOGGLE: 'toggle',
} as const;

export const TABLE_SESSION_ACTION = {
  START: 'start',
  END: 'end',
  EXTEND: 'extend',
  REDUCE: 'reduce',
} as const;

export type TableSessionAction = typeof TABLE_SESSION_ACTION[keyof typeof TABLE_SESSION_ACTION];

/** 실시간 주문 화면 이벤트의 구분 값. GA에 이미 맞춤 측정기준으로 등록된 `location` 파라미터에 싣는다. */
export const ORDER_EVENT_LOCATION = {
  CARD_BUTTON: 'card_button',
  DETAIL_MODAL: 'detail_modal',
  NOT_PAID_CARD: 'not_paid_card',
  PAID_CARD: 'paid_card',
  SERVED_CARD: 'served_card',
} as const;

export const GA_CURRENCY = 'KRW';

/** 체험(/demo) 안 조작. `demo_action` 이벤트의 `action` 값 */
export const DEMO_ACTION = {
  SKIP: 'skip',
  RESTART: 'restart',
  VIEW_GUEST: 'view_guest',
  VIEW_ADMIN: 'view_admin',
  OVERVIEW: 'overview',
  INTRO_START: 'intro_start',
  PEEK_VIEW: 'peek_view',
} as const;

export type DemoAction = typeof DEMO_ACTION[keyof typeof DEMO_ACTION];

/** 체험에 들어온 곳. 랜딩 링크가 `?from=`으로 넘기고 체험 이벤트의 `entry`에 싣는다. 값이 없으면 direct */
export const DEMO_ENTRY = {
  HERO: 'hero',
  BANNER: 'banner',
  FEATURE: 'feature',
  CTA: 'cta',
  INFO: 'info',
  DIRECT: 'direct',
} as const;

export type DemoEntry = typeof DEMO_ENTRY[keyof typeof DEMO_ENTRY];
