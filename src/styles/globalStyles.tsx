import { css } from '@emotion/react';
import { pretendardFont } from '@styles/fonts';

export const globalStyles = css`
  ${pretendardFont}

  * {
    font-family: 'Pretendard-Regular', sans-serif;
  }
`;

const breakPoints = [576, 768, 992, 1200];
export const mediaQueries = breakPoints.map((bp) => `@media (min-width: ${bp}px)`);
