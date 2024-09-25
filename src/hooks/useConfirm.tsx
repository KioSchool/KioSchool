import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import React from 'react';
import AppButton from '@components/common/button/AppButton';
import { Color } from '@resources/colors';

const Container = styled.div`
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.div`
  width: 800px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${Color.white};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
`;

function useConfirm(title: string, description: string, okText: string, cancelText?: string) {
  const [promise, setPromise] = React.useState<any>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleOk = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmModal = () => {
    if (promise === null) return null;

    return (
      <Container className={'confirm-container'}>
        <SubContainer className={'confirm-sub-container'}>
          <TextContainer className={'text-container'}>
            <AppLabel size={'large'} style={{ fontWeight: 700 }} color={Color.white}>
              {title}
            </AppLabel>
            <AppLabel size={24} color={Color.white}>
              {description}
            </AppLabel>
          </TextContainer>
          <ButtonContainer className={'button-container'}>
            {cancelText && (
              <AppButton size={250} onClick={handleCancel} style={{ background: 'white', color: 'black' }}>
                {cancelText}
              </AppButton>
            )}
            <AppButton size={250} onClick={handleOk}>
              {okText}
            </AppButton>
          </ButtonContainer>
        </SubContainer>
      </Container>
    );
  };

  return { ConfirmModal, confirm };
}

export default useConfirm;
