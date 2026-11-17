import { css } from '@emotion/react';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

export const ItemBaseStyle = css`
  height: 24px;
  padding-left: 20px;
  gap: 8px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${Color.TEXT_DEFAULT};
  ${rowFlex({ justify: 'flex-start', align: 'center' })};
`;
