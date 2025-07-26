import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import { RiInformationFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { useState } from 'react';

const Container = styled.div`
  position: absolute;
  right: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const PopupContainer = styled.div`
  position: absolute;
  width: 200px;
  left: 0px;
  top: 30px;
  white-space: pre-line;
  font-size: 13px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.KIO_ORANGE};
  padding: 10px;
  border-radius: 10px;
  z-index: 1000;
`;

function QRInfoTooltip() {
  const [isHover, setIsHover] = useState(false);

  const description = '주문이 불가능한 메뉴 확인용 QR입니다.';

  return (
    <Container>
      <RiInformationFill onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} color={Color.GREY} size={16} />
      {isHover && <PopupContainer>{description}</PopupContainer>}
    </Container>
  );
}

export default QRInfoTooltip;
