import { css } from '@emotion/react';

interface FlexStyleProps {
  direction?: string;
  justify?: string;
  align?: string;
}

export const flexStyle = ({ direction, justify, align }: FlexStyleProps) => css`
  display: flex;
  flex-direction: ${direction || 'column'};
  justify-content: ${justify};
  align-items: ${align};
`;
