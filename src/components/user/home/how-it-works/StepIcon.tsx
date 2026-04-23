import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  margin-top: 20px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

interface StepIconProps {
  step: number;
}

function StepIcon({ step }: StepIconProps) {
  return (
    <IconWrap>
      {match(step)
        .with(1, () => (
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            <rect x="1" y="1" width="30" height="22" rx="3" stroke="#6b7684" strokeWidth="2" fill="none" />
            <path d="M1 3L16 14L31 3" stroke="#6b7684" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        ))
        .with(2, () => (
          <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="2" stroke={Color.KIO_ORANGE} strokeWidth="1.5" fill="none" />
            <path d="M3 5.5L4.5 7L7 3.5" stroke={Color.KIO_ORANGE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="13" y1="5" x2="27" y2="5" stroke="#6B6560" strokeWidth="2" strokeLinecap="round" />
            <rect x="1" y="12" width="8" height="8" rx="2" stroke={Color.KIO_ORANGE} strokeWidth="1.5" fill="none" />
            <path d="M3 16.5L4.5 18L7 14.5" stroke={Color.KIO_ORANGE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="13" y1="16" x2="27" y2="16" stroke="#6B6560" strokeWidth="2" strokeLinecap="round" />
            <rect x="1" y="23" width="8" height="8" rx="2" stroke="#d1d5da" strokeWidth="1.5" fill="none" />
            <line x1="13" y1="27" x2="27" y2="27" stroke="#d1d5da" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ))
        .otherwise(() => (
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="11" y="1" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="21" y="1" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="1" y="11" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="21" y="11" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="1" y="21" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="11" y="21" width="8" height="8" rx="1" fill="#6b7684" />
            <rect x="21" y="21" width="8" height="8" rx="1" fill="#6b7684" />
            <circle cx="27" cy="27" r="7" fill={Color.KIO_ORANGE} />
            <path d="M24 27L26 29L30 25" stroke={Color.WHITE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
    </IconWrap>
  );
}

export default StepIcon;
