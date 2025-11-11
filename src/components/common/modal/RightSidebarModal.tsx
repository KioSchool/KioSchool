import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import { RiArrowRightSLine } from '@remixicon/react';
import useModal from '@hooks/useModal';
import RightSidebarModalOpenButton from './RightSidebarModalOpenButton';

const Container = styled.div``;

const AttachedCloseButton = styled.button`
  position: absolute;
  top: calc(50% - 25px);
  left: -30px;
  transform: translateY(-50%);

  width: 30px;
  height: 100px;
  padding: 0;

  background-color: ${Color.WHITE};
  color: #464a4d;

  border: 1px solid #e8e8f2;
  border-right: none;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  cursor: pointer;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 65px;
  right: 0;
  width: 300px;
  z-index: 1010;
  height: calc(100vh - 65px);
  background-color: ${Color.WHITE};
  border-left: 1px solid #e8eef2;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 46px 10px 0 41px;
  gap: 15px;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  ${colFlex()}

  ${tabletMediaQuery} {
    width: 280px;
  }
`;

const SidebarHeader = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const TitleContainer = styled.div`
  color: #464a4d;
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  font-size: 16px;
  white-space: pre-line;
`;

const CloseButton = styled(RiArrowRightSLine)`
  width: 24px;
  height: 24px;
  color: #464a4d;
  cursor: pointer;
  ${rowFlex({ justify: 'end', align: 'end' })}
`;

interface RightSidebarModalProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isOpenButtonVisible?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

function RightSidebarModal({ title, subtitle, children, isOpenButtonVisible, isOpen, onClose, onOpen }: RightSidebarModalProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const isControlled = typeof isOpen === 'boolean';

  const resolvedIsOpen = isControlled ? (isOpen as boolean) : isModalOpen;
  const handleOpen = () => {
    if (isControlled) {
      onOpen?.();
      return;
    }

    openModal();
  };

  const handleClose = () => {
    if (isControlled) {
      onClose?.();
      return;
    }

    closeModal();
  };

  return (
    <Container>
      {isOpenButtonVisible && <RightSidebarModalOpenButton openModal={handleOpen} />}
      <SidebarContainer isOpen={resolvedIsOpen}>
        {resolvedIsOpen && (
          <AttachedCloseButton onClick={handleClose}>
            <CloseButton />
          </AttachedCloseButton>
        )}

        <SidebarHeader>
          <TitleContainer>
            <Title>{title}</Title>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
          </TitleContainer>
        </SidebarHeader>
        {children}
      </SidebarContainer>
    </Container>
  );
}

export default RightSidebarModal;
