import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import React, { useState } from 'react';
import AppButton from '@components/common/button/AppButton';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const SubContainer = styled.div`
  width: 800px;
  height: 200px;
  ${colFlex({ justify: 'space-between', align: 'center' })}
  color: ${Color.WHITE};
`;

const TextContainer = styled.div`
  ${colFlex({ align: 'center' })}
  gap: 12px;
`;

const ButtonContainer = styled.div`
  ${rowFlex({ justify: 'space-between' })}
  gap: 12px;
`;

interface ConfirmProps {
  title: string;
  description: string;
  okText: string;
  cancelText?: string;
}

function useConfirm({ title, description, okText, cancelText }: ConfirmProps) {
  const [promise, setPromise] = useState<any>(null);

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
            <AppLabel size={'large'} style={{ fontWeight: 700 }} color={Color.WHITE}>
              {title}
            </AppLabel>
            <AppLabel size={24} color={Color.WHITE}>
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
