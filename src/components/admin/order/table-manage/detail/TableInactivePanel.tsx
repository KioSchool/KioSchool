import styled from '@emotion/styled';
import { RiArmchairLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const ICON_SIZE_PX = 40;

const Container = styled.div`
  width: 100%;
  flex: 1;
  padding: 40px 0;
  gap: 14px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Icon = styled(RiArmchairLine)`
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
  color: ${Color.HEAVY_GREY};
`;

const TextColumn = styled.div`
  gap: 4px;
  text-align: center;
  word-break: keep-all;
  text-wrap: balance;
  ${colFlex({ align: 'center' })};
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: ${Color.GREY};
`;

function TableInactivePanel() {
  return (
    <Container>
      <Icon />
      <TextColumn>
        <Title>아직 주문을 받을 수 없는 테이블입니다</Title>
        <Description>손님이 앉으면 사용을 시작하세요.</Description>
      </TextColumn>
    </Container>
  );
}

export default TableInactivePanel;
