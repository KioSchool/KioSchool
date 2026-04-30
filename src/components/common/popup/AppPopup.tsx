import { useEffect, useState } from 'react';
import usePopup from '@hooks/usePopup';
import styled from '@emotion/styled';
import { RiCloseCircleFill } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { PopupData } from '@constants/data/popupData';
import { useCookies } from 'react-cookie';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 9999;
  position: fixed;
  inset: 0;
  pointer-events: none;
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 88px 32px 0 32px;
  box-sizing: border-box;
  pointer-events: none;
  ${colFlex({ justify: 'flex-start', align: 'flex-end' })};
`;

const ContentContainer = styled.div`
  width: 420px;
  max-width: 100%;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: ${Color.WHITE};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
  pointer-events: auto;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const CloseButtonContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'end', align: 'center' })};

  &:hover {
    cursor: pointer;
  }
`;

const CloseText = styled.div`
  font-size: 14px;
  font-weight: 600;
  opacity: 0.56;
`;

const CloseButtonIcon = styled(RiCloseCircleFill)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #e0e0e0;
`;

interface AppPopupProps {
  popupDatas: PopupData[];
}

function AppPopup({ popupDatas }: AppPopupProps) {
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
  }, [cookies, isValidPopup, popupDatas]);

  if (!validPopupData) {
    return null;
  }

  const { popupId, children } = validPopupData;

  return (
    <Container>
      <SubContainer>
        <ContentContainer>
          <CloseButtonContainer
            onClick={() => {
              closePopupForDay(popupId);
            }}
          >
            <CloseText>하루 동안 보지 않기</CloseText>
            <CloseButtonIcon />
          </CloseButtonContainer>
          {children}
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default AppPopup;
