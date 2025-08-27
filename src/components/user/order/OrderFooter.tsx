import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  min-height: 150px;
  height: auto;
  background: ${Color.LIGHT_GREY};
  padding-top: 20px;
  padding-bottom: 120px;
  color: ${Color.GREY};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Content = styled.div`
  width: 90%;
  height: 100%;
  font-size: 12px;
  line-height: 1.8;
  ${colFlex({ justify: 'center' })}
  flex-wrap: wrap;
`;

function OrderFooter() {
  return (
    <Container>
      <Content>
        유의사항 <br />
        · 메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다. <br />
        · 상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로 작성되었으며 변동될 수 있습니다. <br />
        · 키오스쿨은 통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다.
        <br />
      </Content>
    </Container>
  );
}

export default OrderFooter;
