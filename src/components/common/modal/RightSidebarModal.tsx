import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery, tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import { RiCloseLine } from '@remixicon/react';
import { useAtom, useAtomValue } from 'jotai';
import { externalSidebarAtom, layoutScaleAtom } from '@jotai/atoms';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { Location } from 'react-router-dom';
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_MOBILE } from '@constants/layout';

const Container = styled.div``;

const SidebarContainer = styled.div<{ isOpen: boolean; scale: number }>`
  position: fixed;
  top: calc(${NAVBAR_HEIGHT}px / ${(props) => props.scale});
  right: 0;
  width: 300px;
  z-index: 1010;
  height: calc((100vh - ${NAVBAR_HEIGHT}px) / ${(props) => props.scale});
  background-color: ${Color.WHITE};
  border-left: 1px solid #e8eef2;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 20px 16px 0 16px;
  gap: 15px;
  transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  ${colFlex()}

  ${tabletMediaQuery} {
    width: 280px;
  }

  ${mobileMediaQuery} {
    top: ${NAVBAR_HEIGHT_MOBILE}px;
    width: 100%;
    height: calc(100vh - ${NAVBAR_HEIGHT_MOBILE}px);
    border-left: none;
    border-top: 1px solid #e8eef2;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.06);
    padding: 16px 16px 24px 16px;
    transform: translateY(${(props) => (props.isOpen ? '0' : '100%')});
  }
`;

const SidebarHeader = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })};
`;

const TitleContainer = styled.div`
  color: #464a4d;
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  font-size: 16px;
  line-height: 180%;
  white-space: pre-line;
`;

const HeaderCloseButton = styled.button`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  margin-top: 2px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: ${Color.GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: #f5f5f5;
    color: ${Color.BLACK};
  }
`;

interface RightSidebarModalProps {
  useExternalControl: {
    location: Location;
  };
}

function RightSidebarModal({ useExternalControl }: RightSidebarModalProps) {
  const [externalSidebar, setExternalSidebar] = useAtom(externalSidebarAtom);
  const { action, location: externalLocation, title, subtitle, content } = externalSidebar;
  const scale = useAtomValue(layoutScaleAtom);

  const isOpen = action === RIGHT_SIDEBAR_ACTION.OPEN && externalLocation?.pathname === useExternalControl.location.pathname;

  const handleClose = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  return (
    <Container>
      <SidebarContainer isOpen={isOpen} scale={scale}>
        <SidebarHeader>
          <TitleContainer>
            {title && <Title>{title}</Title>}
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
          </TitleContainer>
          <HeaderCloseButton onClick={handleClose} aria-label="닫기">
            <RiCloseLine size={20} />
          </HeaderCloseButton>
        </SidebarHeader>

        {content}
      </SidebarContainer>
    </Container>
  );
}

export default RightSidebarModal;
