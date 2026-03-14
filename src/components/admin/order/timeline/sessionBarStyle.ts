export interface SessionBarStyle {
  backgroundColor: string;
  textColor: string;
}

const GHOST_STYLE: SessionBarStyle = { backgroundColor: '#e8eef2', textColor: 'transparent' };

const COLOR_LEVELS: SessionBarStyle[] = [
  { backgroundColor: '#ffdec5', textColor: '#464a4d' },
  { backgroundColor: '#fdc9a5', textColor: '#464a4d' },
  { backgroundColor: '#f39048', textColor: '#ffffff' },
  { backgroundColor: '#eb7a28', textColor: '#ffffff' },
  { backgroundColor: '#da6100', textColor: '#ffffff' },
];

export function getSessionBarStyle(totalPrice: number, isGhost: boolean, minPrice: number, maxPrice: number): SessionBarStyle {
  if (isGhost) return GHOST_STYLE;
  if (minPrice === maxPrice) return COLOR_LEVELS[COLOR_LEVELS.length - 1];

  const ratio = (totalPrice - minPrice) / (maxPrice - minPrice);
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const index = Math.min(Math.floor(clampedRatio * COLOR_LEVELS.length), COLOR_LEVELS.length - 1);
  return COLOR_LEVELS[index];
}
