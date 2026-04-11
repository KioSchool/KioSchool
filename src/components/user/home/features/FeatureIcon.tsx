import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const IconCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(255, 145, 66, 0.1);
  flex-shrink: 0;
  position: relative;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

export type FeatureIconType = 'qr' | 'realtime' | 'settlement' | 'table';

interface FeatureIconProps {
  iconType: FeatureIconType;
}

function FeatureIcon({ iconType }: FeatureIconProps) {
  return (
    <IconCircle>
      {match(iconType)
        .with('qr', () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="8" rx="1" fill={Color.KIO_ORANGE} />
            <rect x="14" y="2" width="8" height="8" rx="1" fill={Color.KIO_ORANGE} />
            <rect x="2" y="14" width="8" height="8" rx="1" fill={Color.KIO_ORANGE} />
            <rect x="14" y="14" width="4" height="4" rx="1" fill={Color.KIO_ORANGE} />
            <rect x="20" y="14" width="2" height="2" rx="0.5" fill={Color.KIO_ORANGE} />
            <rect x="14" y="20" width="2" height="2" rx="0.5" fill={Color.KIO_ORANGE} />
            <rect x="20" y="20" width="2" height="2" rx="0.5" fill={Color.KIO_ORANGE} />
          </svg>
        ))
        .with('realtime', () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" fill={Color.KIO_ORANGE} />
            <circle cx="12" cy="12" r="8" stroke={Color.KIO_ORANGE} strokeWidth="1.5" opacity="0.3" fill="none" />
            <circle cx="12" cy="12" r="11" stroke={Color.KIO_ORANGE} strokeWidth="1" opacity="0.15" fill="none" />
          </svg>
        ))
        .with('settlement', () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="14" width="4" height="8" rx="1" fill={Color.KIO_ORANGE} opacity="0.4" />
            <rect x="8" y="10" width="4" height="12" rx="1" fill={Color.KIO_ORANGE} opacity="0.7" />
            <rect x="14" y="6" width="4" height="16" rx="1" fill={Color.KIO_ORANGE} />
            <rect x="20" y="2" width="4" height="20" rx="1" fill={Color.KIO_ORANGE} opacity="0.85" />
          </svg>
        ))
        .with('table', () => (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="8" height="8" rx="2" stroke={Color.KIO_ORANGE} strokeWidth="1.5" fill="rgba(255,145,66,0.1)" />
            <rect x="14" y="2" width="8" height="8" rx="2" stroke={Color.KIO_ORANGE} strokeWidth="1.5" fill="rgba(255,145,66,0.1)" />
            <rect x="2" y="14" width="8" height="8" rx="2" stroke={Color.KIO_ORANGE} strokeWidth="1.5" fill="rgba(255,145,66,0.1)" />
            <rect x="14" y="14" width="8" height="8" rx="2" stroke={Color.KIO_ORANGE} strokeWidth="1.5" fill="rgba(255,145,66,0.1)" />
          </svg>
        ))
        .exhaustive()}
    </IconCircle>
  );
}

export default FeatureIcon;
