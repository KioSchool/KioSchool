import { GhostType } from '@@types/index';
import { Color } from '@resources/colors';

export const TIMELINE_START_HOUR = 9;

export const FALLBACK_WALL_START_HOUR = 17;
export const FALLBACK_WALL_END_HOUR = 5;

export const MIN_VALID_SESSION_MINUTES = 30;

export const TIMELINE_COLORS = {
  TEXT_PRIMARY: Color.TEXT_DEFAULT,
  TEXT_SECONDARY: '#939393',
  BORDER: '#eaeaea',
  BORDER_CARD: Color.BORDER_GREY,
  BACKGROUND_LIGHT: '#fafafa',
  HEADER_BG: Color.GREY_FAINT,
  GHOST_TEXT: '#7c3aad',
  GHOST_BG: '#f0edf5',
  GHOST_BORDER: '#e0d6ed',
  GHOST_STRIPE: 'rgba(149,133,176,0.25)',
} as const;

export const GHOST_MESSAGES: Record<GhostType, { badge: string; description: string }> = {
  NONE: { badge: '', description: '' },
  USER: {
    badge: '수동 종료 세션',
    description: '운영진에 의해 종료된 세션입니다',
  },
  BATCH: {
    badge: '자동 종료 세션',
    description: '시스템에 의해 자동 종료된 세션입니다',
  },
};

export const SESSION_MESSAGES = {
  ACTIVE_GUIDE: '세션이 종료되면 집계가 가능해요',
} as const;
