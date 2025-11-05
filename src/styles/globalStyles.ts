import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    font-family: 'LINE Seed Sans KR', sans-serif;
  }
`;

const breakPoints = [576, 768, 992, 1200];
export const mediaQueries = breakPoints.map((bp) => `@media (max-width: ${bp}px)`);
export const tabletMediaQuery = mediaQueries[3];
export const mobileMediaQuery = mediaQueries[1];
