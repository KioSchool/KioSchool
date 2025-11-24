import { css } from '@emotion/react';
import { rowFlex } from '@styles/flexStyles';

export const ItemBaseStyle = css`
  height: 24px;
  padding-left: 20px;
  gap: 8px;
  box-sizing: border-box;
  cursor: pointer;
  color: #464a4d;
  ${rowFlex({ justify: 'flex-start', align: 'center' })};
`;
