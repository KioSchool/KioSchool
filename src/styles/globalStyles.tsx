import { css } from '@emotion/react';
import { pretendardFont } from '@styles/fonts';

export const globalStyles = css`
  ${pretendardFont}

  * {
    font-family: 'Pretendard', sans-serif;
  }
`;

const breakPoints = [576, 768, 992, 1200];
export const mediaQueries = breakPoints.map((bp) => `@media (max-width: ${bp}px)`);
export const tabletMediaQuery = mediaQueries[3];
