import React from 'react';
import { Order } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex } from '@styles/flexStyles';

const ContentsContainer = styled.div`
  ${colFlex({ justify: 'space-between' })}
  width: 100%;
  height: 53px;
`;

interface NotPaidCardContentsProps {
  contents: Order;
}

function NotPaidCardContents({ contents }: NotPaidCardContentsProps) {
  const { orderProducts, totalPrice } = contents;

  const firstProductName = orderProducts.length > 0 ? orderProducts[0].productName : '상품 없음';
  const totalProductsCount = orderProducts.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <ContentsContainer>
      <AppLabel size={15} style={{ marginRight: 'auto' }}>{`${firstProductName} 외 ${totalProductsCount}건`}</AppLabel>
      <AppLabel size={15} style={{ marginLeft: 'auto' }}>{`총 ${totalPrice.toLocaleString()}원`}</AppLabel>
    </ContentsContainer>
  );
}

export default NotPaidCardContents;
