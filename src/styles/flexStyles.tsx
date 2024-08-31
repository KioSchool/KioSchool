import { css } from '@emotion/react';

interface FlexProps {
  justify?: string;
  align?: string;
}

const flexContents = ({ justify, align }: FlexProps) => css`
  justify-content: ${justify};
  align-items: ${align};
`;

export const colFlex = ({ justify, align }: FlexProps = {}) => css`
  display: flex;
  flex-direction: column;
  ${flexContents({ justify, align })}
`;

export const rowFlex = ({ justify, align }: FlexProps = {}) => css`
  display: flex;
  flex-direction: row;
  ${flexContents({ justify, align })}
`;
