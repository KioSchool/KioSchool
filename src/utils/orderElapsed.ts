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

interface ElapsedLevelStyle {
  text: string;
  surface: string;
  border: string;
}

// 실시간 테이블 화면의 상태 색을 그대로 쓴다: 경고는 배치 카드 WARNING, 초과는 상태 뱃지 EXCEEDED
export const ELAPSED_LEVEL_STYLE: Record<ElapsedLevel, ElapsedLevelStyle> = {
  [ELAPSED_LEVEL.NORMAL]: { text: '#464a4d', surface: Color.WHITE, border: Color.BORDER_GREY },
  [ELAPSED_LEVEL.WARNING]: { text: Color.KIO_ORANGE_DARK, surface: Color.KIO_ORANGE_FAINT, border: '#FFD2A8' },
  [ELAPSED_LEVEL.DANGER]: { text: Color.RED, surface: Color.LIGHT_RED, border: Color.RED },
};

export function getElapsedLevel(minutes: number): ElapsedLevel {
  if (minutes >= ELAPSED_DANGER_MINUTES) return ELAPSED_LEVEL.DANGER;
  if (minutes >= ELAPSED_WARNING_MINUTES) return ELAPSED_LEVEL.WARNING;
  return ELAPSED_LEVEL.NORMAL;
}
