export const TIMELINE_START_HOUR = 9;
export const TIMELINE_HOURS = 24;

export const MIN_VALID_SESSION_MINUTES = 30;

export const TIMELINE_COLORS = {
  TEXT_PRIMARY: '#464a4d',
  TEXT_SECONDARY: '#939393',
  BORDER: '#eaeaea',
  BORDER_CARD: '#e8eef2',
  BACKGROUND_LIGHT: '#fafafa',
  HEADER_BG: '#f0f5f8',
  GHOST_TEXT: '#7c3aad',
  GHOST_BG: '#f0edf5',
  GHOST_BORDER: '#e0d6ed',
  GHOST_STRIPE: 'rgba(149,133,176,0.25)',
} as const;

export const SESSION_MESSAGES = {
  GHOST_DESCRIPTION: '유의미하지 않은 세션으로 분류되었습니다',
  GHOST_BADGE_LABEL: '유의미하지 않은 세션',
  ACTIVE_GUIDE: '세션이 종료되면 집계가 가능해요',
} as const;
