import React, { useEffect, useState } from 'react';
import usePopup from '@hooks/usePopup';
import styled from '@emotion/styled';
import { RiCloseCircleFill } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { PopupData, popupDatas } from '@resources/data/popupData';
import { useCookies } from 'react-cookie';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 9999;
  position: fixed;
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ContentContainer = styled.div`
  width: 600px;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${Color.WHITE};
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.05);
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const CloseButtonContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })};
`;

const CloseText = styled.div`
  font-size: 12px;
  font-weight: 400;
  opacity: 0.56;
`;

const CloseButton = styled(RiCloseCircleFill)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #e0e0e0;
`;

function AppPopup() {
  const { isValidPopup, closePopupForDay } = usePopup();
  const [validPopupData, setValidPopupData] = useState<PopupData | null>(popupDatas[0]);
  const [cookies] = useCookies();

  useEffect(() => {
    const index = popupDatas.findIndex(({ popupId, expireDate }) => isValidPopup(popupId, expireDate));

    if (index === -1) {
      setValidPopupData(null);
      return;
    }

    setValidPopupData(popupDatas[index]);
  }, [cookies]);

  if (!validPopupData) {
    return null;
  }

  const { popupId, children } = validPopupData;

  return (
    <Container>
      <SubContainer>
        <ContentContainer>
          <CloseButtonContainer>
            <CloseText>하루 동안 보지 않기</CloseText>
            <CloseButton
              onClick={() => {
                closePopupForDay(popupId);
              }}
            />
          </CloseButtonContainer>
          {children}
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default AppPopup;
