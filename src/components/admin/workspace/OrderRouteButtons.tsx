import RouterButton from '@components/common/button/RouterButton';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import productImage from '@resources/image/productImage.png';
import orderImage from '@resources/image/orderImage.png';
import workspaceImage from '@resources/image/super-admin/workspaceImage.png';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 90%;
  height: 200px;
  ${colFlex({ justify: 'center' })}
`;

const TitleContainer = styled.div`
  width: 300px;
  height: 35px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 130px;
  gap: 15px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

function OrderManageContent() {
  const buttonContents = [
    { name: '실시간 주문 조회', path: '/order/realtime', imageSrc: productImage },
    { name: '전체 주문 조회', path: '/order/history', imageSrc: orderImage },
    { name: '테이블 주문 조회', path: '/order/table', imageSrc: workspaceImage },
  ];

  return (
    <Container>
      <TitleContainer>
        <AppLabel size={19} color={Color.GREY} style={{ fontWeight: 600 }}>
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
