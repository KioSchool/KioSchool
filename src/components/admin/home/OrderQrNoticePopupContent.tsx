import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Title = styled.div`
  color: ${Color.BLACK};
  text-align: center;
  word-break: keep-all;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
`;

const Description = styled.div`
  color: ${Color.BLACK};
  text-align: center;
  word-break: keep-all;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  opacity: 0.72;
  white-space: pre-wrap;
`;

function OrderQrNoticePopupContent() {
  return (
    <Container>
      <Title>4월 30일 이전에 다운로드한 주문 QR 코드는 작동하지 않습니다.</Title>
      <Description>
        주문을 받으려면 주문 QR 코드를 다시 다운로드해 주세요.
        {'\n'}
        기존에 저장해둔 QR 이미지는 삭제 후 새 QR로 교체해 주세요.
      </Description>
    </Container>
  );
}

export default OrderQrNoticePopupContent;
