export const Color = {
  GREY: '#5c5c5c',
  WHITE: 'white',
  BLACK: 'black',
  KIO_ORANGE: '#FF9142',
  HEAVY_GREY: '#d8d8d8',
  LIGHT_GREY: '#f7f7f7',
  GREEN: '#0CAF60',
  RED: '#FF5A5A',
  LIGHT_RED: '#FFEBEB',
  BLUE: '#46ADFF',

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
  EYEBROW_TEXT: '#8d959c',
  TITLE_TEXT: '#25282b',
  BODY_TEXT: '#4f565b',
  MUTED_TEXT: '#7b858c',
  STEP_ACTIVE_BORDER: '#ffd7b8',
  STEP_ACTIVE_BG: '#fffaf5',
  STEP_INACTIVE_BORDER: '#e8eef2',
  STEP_INACTIVE_BG: '#ffffff',
  STEP_COMPLETED_BG: '#edf9f1',
  STEP_PENDING_BG: '#fff3e7',
  STEP_IDLE_BORDER: '#d7dde2',
  CONNECTOR_IDLE: '#e8eef2',
} as const;

export type ColorType = (typeof Color)[keyof typeof Color];
