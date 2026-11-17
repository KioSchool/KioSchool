export const Color = {
  GREY: '#5c5c5c',
  MUTED_GREY: '#8d959c',
  BORDER_GREY: '#e8eef2',
  WHITE: 'white',
  BLACK: 'black',
  KIO_ORANGE: '#FF9142',
  HEAVY_GREY: '#d8d8d8',
  LIGHT_GREY: '#f7f7f7',
  GREEN: '#0CAF60',
  RED: '#FF5A5A',
  LIGHT_RED: '#FFEBEB',
  BLUE: '#46ADFF',

  TEXT_STRONG: '#25282b',
  TEXT_DEFAULT: '#464a4d',
  // 본문보다 옅되 읽어야 하는 텍스트용. 흰 배경 대비 4.91:1로 WCAG AA를 넘는 가장 옅은 값이다
  TEXT_SUBTLE: '#697278',
  TEXT_HINT: '#9aa1a6',
  DISABLED_GREY: '#d1d5d8',
  GREY_FAINT: '#f0f5f8',

  KIO_ORANGE_FAINT: '#FFF3E7',
  GREEN_FAINT: '#EDF9F1',
  BLUE_FAINT: '#E8F5FF',
  KIO_ORANGE_DARK: '#f7842e',
  KIO_ORANGE_ICON_BG: '#FFE7D3',
  BLUE_ICON_BG: '#DCEEFF',
  GREEN_ICON_BG: '#D4F1E1',
  GREY_ICON_BG: '#E5E5E5',
} as const;

export const OnboardingColor = {
  EYEBROW_TEXT: Color.MUTED_GREY,
  TITLE_TEXT: Color.TEXT_STRONG,
  BODY_TEXT: '#4f565b',
  SUBTLE_TEXT: Color.TEXT_SUBTLE,
  MUTED_TEXT: '#7b858c',
  STEP_ACTIVE_BORDER: '#ffd7b8',
  STEP_ACTIVE_BG: '#fffaf5',
  STEP_INACTIVE_BORDER: Color.BORDER_GREY,
  STEP_INACTIVE_BG: Color.WHITE,
  STEP_COMPLETED_BG: Color.GREEN_FAINT,
  STEP_PENDING_BG: Color.KIO_ORANGE_FAINT,
  STEP_IDLE_BORDER: '#d7dde2',
  CONNECTOR_IDLE: Color.BORDER_GREY,
} as const;

export type ColorType = typeof Color[keyof typeof Color];
