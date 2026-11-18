import styled from '@emotion/styled';
import { LandingColor } from '@resources/colors';

const Svg = styled.svg`
  width: 22px;
  height: 22px;
  flex: none;
`;

interface PlayIconProps {
  circleColor?: string;
  triangleColor?: string;
}

function PlayIcon({ circleColor = LandingColor.ACCENT, triangleColor = '#ffffff' }: PlayIconProps) {
  return (
    <Svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill={circleColor} />
      <path d="M9.5 7.6v8.8l7-4.4z" fill={triangleColor} />
    </Svg>
  );
}

export default PlayIcon;
