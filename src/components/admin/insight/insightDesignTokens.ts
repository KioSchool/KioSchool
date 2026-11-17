import { Color } from '@resources/colors';

export const InsightDesignTokens = {
  card: {
    background: Color.WHITE,
    border: '#eaeaea',
    shadow: '0px 4px 20px rgba(92, 92, 92, 0.05)',
    radius: '16px',
    padding: '14px 21px',
  },
  text: {
    primary: Color.TEXT_DEFAULT,
    muted: '#939393',
  },
  brand: {
    main: Color.KIO_ORANGE,
    dark: Color.KIO_ORANGE_DARK,
    faint: Color.KIO_ORANGE_FAINT,
    fainter: '#FFFAF5',
    iconBg: Color.KIO_ORANGE_ICON_BG,
  },
  rank: {
    1: { bg: Color.KIO_ORANGE_ICON_BG, border: '#FFD4B0', text: Color.KIO_ORANGE_DARK, labelText: Color.KIO_ORANGE_DARK },
    2: { bg: Color.KIO_ORANGE_FAINT, border: Color.KIO_ORANGE_ICON_BG, text: Color.KIO_ORANGE, labelText: Color.KIO_ORANGE },
    3: { bg: '#FFFAF5', border: Color.KIO_ORANGE_FAINT, text: Color.TEXT_DEFAULT, labelText: '#939393' },
    4: { bg: Color.LIGHT_GREY, border: '#eaeaea', text: Color.TEXT_DEFAULT, labelText: '#939393' },
  },
  png: {
    size: 1200,
    background: `linear-gradient(135deg, ${Color.KIO_ORANGE_ICON_BG} 0%, ${Color.KIO_ORANGE_FAINT} 100%)`,
    cellAlpha: { 1: 0.85, 2: 0.75, 3: 0.55, 4: 0.4 } as Record<1 | 2 | 3 | 4, number>,
  },
} as const;

export type RankKey = 1 | 2 | 3 | 4;
