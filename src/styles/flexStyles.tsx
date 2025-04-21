import { css } from '@emotion/react';

export type JustifyType = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';

export type AlignItemsType = 'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'flex-start' | 'flex-end';
interface FlexProps {
  justify?: JustifyType;
  align?: AlignItemsType;
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
