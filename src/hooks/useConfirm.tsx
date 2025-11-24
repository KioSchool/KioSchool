import styled from '@emotion/styled';
import { useState } from 'react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  z-index: 1011;
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
  height: 176px;
  color: ${Color.WHITE};
  ${colFlex({ justify: 'space-between', align: 'center' })}
`;

const TextContainer = styled.div`
  gap: 14px;
  ${colFlex({ align: 'center' })}
`;

const ButtonContainer = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'space-between' })}
`;

const TitleLabel = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

const DescriptionLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 12px 0;
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
            <TitleLabel>{title}</TitleLabel>
            <DescriptionLabel>{description}</DescriptionLabel>
          </TextContainer>
          <ButtonContainer className={'button-container'}>
            {cancelText && (
              <NewCommonButton size="sm" color="blue_gray" onClick={handleCancel}>
                {cancelText}
              </NewCommonButton>
            )}
            <NewCommonButton size="sm" color="kio_orange" onClick={handleOk}>
              {okText}
            </NewCommonButton>
          </ButtonContainer>
        </SubContainer>
      </Container>
    );
  };

  return { ConfirmModal, confirm };
}

export default useConfirm;
