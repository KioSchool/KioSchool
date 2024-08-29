import { css } from '@emotion/react';

interface FlexStyleProps {
  direction: string;
  justify?: string;
  align?: string;
}

export const flexStyle = ({ direction = 'column', justify, align }: FlexStyleProps) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify || 'center'};
  align-items: ${align || 'center'};
`;
