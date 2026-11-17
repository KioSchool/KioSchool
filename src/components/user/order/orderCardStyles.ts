import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

export const OrderCard = styled.section`
  box-sizing: border-box;
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  ${colFlex({ align: 'stretch' })}
`;

export const OrderCardTitle = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
`;

export const OrderCardDivider = styled.hr`
  width: 100%;
  margin: 0;
  border: none;
  border-top: 1px solid ${Color.BORDER_GREY};
`;

export const OrderItemName = styled.span`
  gap: 6px;
  color: ${Color.TEXT_DEFAULT};
  font-size: 14px;
  ${rowFlex({ align: 'center' })}
`;

export const OrderItemQuantity = styled.span`
  color: ${Color.TEXT_HINT};
  font-size: 13px;
`;
