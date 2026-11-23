import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';

const Svg = styled.svg`
  width: 220px;
  height: 120px;

  ${mobileMediaQuery} {
    width: 200px;
    height: 109px;
  }
`;

function SharedDevicesIllustration() {
  return (
    <Svg
      viewBox="0 0 220 120"
      fill="none"
      stroke={LandingColor.CAPTION}
      strokeWidth="3"
      strokeLinejoin="round"
      role="img"
      aria-label="카운터 노트북과 주방 태블릿"
    >
      <rect x="8" y="14" width="120" height="76" rx="6" />
      <path d="M0 100h136" />
      <rect x="152" y="22" width="60" height="84" rx="8" />
      <circle cx="182" cy="96" r="3" fill={LandingColor.CAPTION} stroke="none" />
      <text x="68" y="58" fill={LandingColor.SUB_TEXT} stroke="none" fontSize="15" fontWeight="700" textAnchor="middle">
        카운터
      </text>
      <text x="182" y="68" fill={LandingColor.SUB_TEXT} stroke="none" fontSize="15" fontWeight="700" textAnchor="middle">
        주방
      </text>
    </Svg>
  );
}

export default SharedDevicesIllustration;
