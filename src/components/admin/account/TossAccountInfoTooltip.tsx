import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import { useRecoilValue } from 'recoil';
import { adminUserAccountAtomSelector } from '@recoils/atoms';
import { RiInformationFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { afterAccountInfoRegisteredDescription, beforeAccountInfoRegisteredDescription } from '@resources/data/tossAccountInfoData';
import { useState } from 'react';

const Container = styled.div`
  width: 100%;
  position: relative;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const PopupContainer = styled.div`
  position: absolute;
  width: 90%;
  right: 0;
  top: 30px;
  white-space: pre-line;
  font-size: 13px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.KIO_ORANGE};
  padding: 10px;
  border-radius: 10px;
`;

const HighlightText = styled.mark`
  font-weight: 700;
  background: linear-gradient(to top, rgba(235, 109, 9, 0.2) 50%, transparent 50%);
  border-radius: 10px;
`;

function TossAccountInfoTooltip() {
  const [isHover, setIsHover] = useState(false);

  const accountInfo = useRecoilValue(adminUserAccountAtomSelector);
  const isAccountRegistered = !!accountInfo.accountNumber;

  const description = isAccountRegistered ? afterAccountInfoRegisteredDescription : beforeAccountInfoRegisteredDescription;

  return (
    <Container>
      <RiInformationFill onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} />
      {isHover && (
        <PopupContainer>
          {description.map((item) => (
            <span key={item.text}>{item.useHighlight ? <HighlightText>{item.text}</HighlightText> : item.text}</span>
          ))}
        </PopupContainer>
      )}
    </Container>
  );
}

export default TossAccountInfoTooltip;
