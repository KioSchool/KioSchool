import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const ContentsContainer = styled.div`
  ${colFlex({ justify: 'space-between' })}
  width: 100%;
  height: 53px;
`;

interface OrderSummaryContentsProps {
  contents: Order;
}

function OrderSummaryContents({ contents }: OrderSummaryContentsProps) {
  const { orderProducts, totalPrice } = contents;

  const firstProductName = orderProducts.length > 0 ? orderProducts[0].productName : '상품 없음';
  const totalProductsCount = orderProducts.reduce((acc, product) => acc + product.quantity, 0) - 1;

  return (
    <ContentsContainer>
      <AppLabel color={Color.BLACK} size={15} style={{ marginRight: 'auto' }}>{`${firstProductName} 외 ${totalProductsCount}건`}</AppLabel>
      <AppLabel color={Color.BLACK} size={15} style={{ marginLeft: 'auto' }}>{`총 ${totalPrice.toLocaleString()}원`}</AppLabel>
    </ContentsContainer>
  );
}

export default OrderSummaryContents;
