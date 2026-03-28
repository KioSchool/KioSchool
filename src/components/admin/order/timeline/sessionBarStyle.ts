import { TIMELINE_COLORS } from './timelineConstants';

export interface SessionBarStyle {
  backgroundColor: string;
  textColor: string;
  backgroundImage?: string;
}

const GHOST_STYLE: SessionBarStyle = {
  backgroundColor: TIMELINE_COLORS.GHOST_BG,
  textColor: TIMELINE_COLORS.GHOST_TEXT,
  backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${TIMELINE_COLORS.GHOST_STRIPE} 4px, ${TIMELINE_COLORS.GHOST_STRIPE} 8px)`,
};

const EMPTY_SESSION_STYLE: SessionBarStyle = { backgroundColor: '#d5dbe0', textColor: '#8c9196' };

const COLOR_LEVELS: SessionBarStyle[] = [
  { backgroundColor: '#ffdec5', textColor: '#464a4d' },
  { backgroundColor: '#fdc9a5', textColor: '#464a4d' },
  { backgroundColor: '#f39048', textColor: '#ffffff' },
  { backgroundColor: '#eb7a28', textColor: '#ffffff' },
  { backgroundColor: '#da6100', textColor: '#ffffff' },
];

// 매출 금액을 min~max 범위에서 0~1 비율로 정규화한 뒤,
// 비율에 따라 5단계 색상 레벨(연한 주황 → 진한 주황) 중 하나를 선택한다.
export function getSessionBarStyle(totalPrice: number, isGhost: boolean, orderCount: number, minPrice: number, maxPrice: number): SessionBarStyle {
  if (isGhost) return GHOST_STYLE;
  if (orderCount === 0) return EMPTY_SESSION_STYLE;
  if (minPrice === maxPrice) return COLOR_LEVELS[COLOR_LEVELS.length - 1];

  const ratio = (totalPrice - minPrice) / (maxPrice - minPrice);
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const index = Math.min(Math.floor(clampedRatio * COLOR_LEVELS.length), COLOR_LEVELS.length - 1);
  return COLOR_LEVELS[index];
}
