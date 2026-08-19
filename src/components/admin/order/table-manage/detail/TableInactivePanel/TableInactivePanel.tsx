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

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: ${Color.GREY};
  text-align: center;
`;

function TableInactivePanel() {
  return (
    <Container>
      <Icon />
      <Message>
        아직 사용을 시작하지 않은 테이블입니다.
        <br />
        손님이 앉으면 사용을 시작하세요.
      </Message>
    </Container>
  );
}

export default TableInactivePanel;
