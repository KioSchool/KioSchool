import RouterButton from '@components/common/button/RouterButton';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 90%;
  height: 200px;
  ${colFlex({ justify: 'center' })}
`;

const TitleContainer = styled.div`
  width: 300px;
  height: 50px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 130px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

function OrderManageContent() {
  const buttonContents = [
    { name: '실시간 주문 조회', path: 'order/realtime' },
    { name: '전체 주문 조회', path: 'order/history' },
    { name: '테이블 주문 조회', path: 'order/table' },
  ];
  return (
    <Container>
      <TitleContainer>
        <AppLabel size={25} style={{ color: '#5C5C5C', fontWeight: 600 }}>
          주문 관리
        </AppLabel>
      </TitleContainer>
      <ButtonContainer>
        {buttonContents.map((content, index) => (
          <RouterButton key={index} {...content} />
        ))}
      </ButtonContainer>
    </Container>
  );
}

export default OrderManageContent;
