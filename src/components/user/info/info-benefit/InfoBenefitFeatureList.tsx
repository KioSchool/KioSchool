import React from 'react';
import styled from '@emotion/styled';
import CheckSvg from '@resources/svg/CheckSvg';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { lineSeedKrFont } from '@styles/fonts';

const features = [
  'QR 코드로 간편한 주문 및 결제 관리',
  '실시간 주문 조회로 효율적 운영 가능',
  '별도 장비 없이 손쉽게 시스템 도입',
  '직관적인 UI로 누구나 쉽게 사용 가능',
  '빠른 주문 처리로 대기 시간 최소화',
];

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${colFlex({ justify: 'center' })};
`;

const ListContainer = styled.div`
  width: 100%;
  gap: 28px;
  ${colFlex()};
`;

const List = styled.div`
  gap: 25px;
  font-size: 18px;
  font-weight: 400;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  ${lineSeedKrFont};
  ${rowFlex({ align: 'center' })};
`;

function InfoBenefitFeatureList() {
  return (
    <Container>
      <ListContainer>
        {features.map((feature) => (
          <List key={feature}>
            <CheckSvg />
            {feature}
          </List>
        ))}
      </ListContainer>
    </Container>
  );
}

export default InfoBenefitFeatureList;
