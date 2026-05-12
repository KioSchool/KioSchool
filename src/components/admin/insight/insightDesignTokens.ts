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
    primary: '#464a4d',
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
    1: { bg: '#FFE7D3', border: '#FFD4B0', text: '#f7842e', labelText: '#f7842e' },
    2: { bg: '#FFF3E7', border: '#FFE7D3', text: '#FF9142', labelText: '#FF9142' },
    3: { bg: '#FFFAF5', border: '#FFF3E7', text: '#464a4d', labelText: '#939393' },
    4: { bg: '#F7F7F7', border: '#eaeaea', text: '#464a4d', labelText: '#939393' },
  },
  png: {
    size: 1200,
    background: 'linear-gradient(135deg, #FFE7D3 0%, #FFF3E7 100%)',
    cellAlpha: { 1: 0.85, 2: 0.75, 3: 0.55, 4: 0.4 } as Record<1 | 2 | 3 | 4, number>,
  },
} as const;

export type RankKey = 1 | 2 | 3 | 4;
