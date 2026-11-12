import { Color } from '@resources/colors';

// 2026 가을 시즌 결제→서빙 시간의 p75(14.9분)·p90(24.2분)에서 가져온 기준이다
export const ELAPSED_WARNING_MINUTES = 15;
export const ELAPSED_DANGER_MINUTES = 25;

export const ELAPSED_LEVEL = {
  NORMAL: 'normal',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type ElapsedLevel = typeof ELAPSED_LEVEL[keyof typeof ELAPSED_LEVEL];

// 실시간 테이블 화면의 상태 색을 그대로 쓴다: 경고는 KIO_ORANGE_DARK, 초과는 RED
export const ELAPSED_LEVEL_COLOR: Record<ElapsedLevel, string> = {
  [ELAPSED_LEVEL.NORMAL]: '#464a4d',
  [ELAPSED_LEVEL.WARNING]: Color.KIO_ORANGE_DARK,
  [ELAPSED_LEVEL.DANGER]: Color.RED,
};

export function getElapsedLevel(minutes: number): ElapsedLevel {
  if (minutes >= ELAPSED_DANGER_MINUTES) return ELAPSED_LEVEL.DANGER;
  if (minutes >= ELAPSED_WARNING_MINUTES) return ELAPSED_LEVEL.WARNING;
  return ELAPSED_LEVEL.NORMAL;
}
