import { css } from '@emotion/react';

interface FlexProps {
  justify?: string;
  align?: string;
}

export const colFlex = ({ justify, align }: FlexProps) => css`
  display: flex;
  flex-direction: column;
  justify-content: ${justify};
  align-items: ${align};
`;

export const rowFlex = ({ justify, align }: FlexProps) => css`
  display: flex;
  flex-direction: row;
  justify-content: ${justify};
  align-items: ${align};
`;
