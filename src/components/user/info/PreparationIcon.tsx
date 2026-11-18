import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { LandingColor } from '@resources/colors';

export type PreparationKind = 'device' | 'account' | 'qr' | 'phone';

const Svg = styled.svg`
  width: 40px;
  height: 40px;
  display: block;
`;

interface PreparationIconProps {
  kind: PreparationKind;
}

function PreparationIcon({ kind }: PreparationIconProps) {
  const shape = match(kind)
    .with('device', () => (
      <g>
        <rect x="6" y="9" width="28" height="18" rx="2" />
        <path d="M3 31h34" />
      </g>
    ))
    .with('account', () => <path d="M5 15 20 7l15 8zM9 17v12M16 17v12M24 17v12M31 17v12M5 32h30" />)
    .with('qr', () => (
      <g>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <rect x="23" y="7" width="10" height="10" rx="1.5" />
        <rect x="7" y="23" width="10" height="10" rx="1.5" />
        <path d="M23 23h4v4M33 23v10h-6M23 31v2" />
      </g>
    ))
    .with('phone', () => (
      <g>
        <rect x="12" y="5" width="16" height="30" rx="3" />
        <path d="M18 30h4" />
      </g>
    ))
    .exhaustive();

  return (
    <Svg viewBox="0 0 40 40" fill="none" stroke={LandingColor.ACCENT_TEXT} strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true">
      {shape}
    </Svg>
  );
}

export default PreparationIcon;
