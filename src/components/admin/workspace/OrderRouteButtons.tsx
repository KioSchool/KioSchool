import RouterButton from '@components/common/button/RouterButton';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import realtimeOrderImage from '@resources/image/admin/workspace/realtimeOrderImage.png';
import orderStatistics from '@resources/image/admin/workspace/orderStatistics.png';
import realtimeOrderTable from '@resources/image/admin/workspace/realtimeOrderTable.png';
import { Color } from '@resources/colors';
import { tabletMediaQuery } from '@styles/globalStyles';

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

  ${tabletMediaQuery} {
    height: 110px;
  }
`;

function OrderManageContent() {
  const buttonContents = [
    { name: '실시간 주문 조회', path: '/order/realtime', imageSrc: realtimeOrderImage },
    {
      name: '실시간 테이블 관리',
      path: '/order/table',
      imageSrc: realtimeOrderTable,
      defaultQuery: { tableNo: '1' },
    },
    { name: '주문 통계', path: '/order/statistics', imageSrc: orderStatistics },
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
