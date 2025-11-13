import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import { RiArrowRightSLine } from '@remixicon/react';
import useModal from '@hooks/useModal';
import RightSidebarModalOpenButton from './RightSidebarModalOpenButton';
import { useAtomValue, useSetAtom } from 'jotai';
import { externalSidebarAtom } from 'src/jotai/admin/atoms';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';

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

interface InternalSidebarControlProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  useOpenButton?: boolean;
  useExternalControl?: never;
}

interface ExternalSidebarControlProps {
  title?: never;
  subtitle?: never;
  children?: never;
  useOpenButton?: never;
  useExternalControl: {
    routerPath: string;
  };
}

type RightSidebarModalProps = InternalSidebarControlProps | ExternalSidebarControlProps;

function RightSidebarModal({ title, subtitle, useOpenButton = true, children, useExternalControl }: RightSidebarModalProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const externalSidebar = useAtomValue(externalSidebarAtom);
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const isControlled = useExternalControl !== undefined;

  const isOpen = isControlled ? externalSidebar.action === RIGHT_SIDEBAR_ACTION.OPEN && externalSidebar.router === useExternalControl.routerPath : isModalOpen;

  const displayData = isControlled
    ? {
        title: externalSidebar.title,
        subtitle: externalSidebar.subtitle,
        content: externalSidebar.content,
      }
    : {
        title,
        subtitle,
        content: children,
      };

  const handleClose = () => {
    if (isControlled) {
      setExternalSidebar({
        router: useExternalControl.routerPath,
        title: externalSidebar.title,
        action: RIGHT_SIDEBAR_ACTION.CLOSE,
        content: null,
      });
    } else {
      closeModal();
    }
  };

  return (
    <Container>
      {!isControlled && useOpenButton && <RightSidebarModalOpenButton openModal={openModal} />}

      <SidebarContainer isOpen={isOpen}>
        {isOpen && (
          <AttachedCloseButton onClick={handleClose}>
            <CloseButton />
          </AttachedCloseButton>
        )}

        {(displayData.title || displayData.subtitle) && (
          <SidebarHeader>
            <TitleContainer>
              {displayData.title && <Title>{displayData.title}</Title>}
              {displayData.subtitle && <SubTitle>{displayData.subtitle}</SubTitle>}
            </TitleContainer>
          </SidebarHeader>
        )}

        {displayData.content}
      </SidebarContainer>
    </Container>
  );
}

export default RightSidebarModal;
