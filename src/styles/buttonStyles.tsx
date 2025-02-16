import { css } from '@emotion/react';

export const expandButtonStyle = (props: { scaleSize?: string }) => css`
  cursor: pointer;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(${props.scaleSize || '1.1'});
  }
`;
