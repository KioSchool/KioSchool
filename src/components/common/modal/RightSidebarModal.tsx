import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import { RiCloseLine } from '@remixicon/react';
import AppLabel from '@components/common/label/AppLabel';

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
  z-index: 1011;
  padding: 20px 10px 0 40px;
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
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const CloseButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  color: #464a4d;
  cursor: pointer;
  ${rowFlex({ justify: 'end', align: 'end' })}
`;

interface RightSidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function RightSidebarModal({ isOpen, onClose, title, subtitle, children }: RightSidebarModalProps) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <CloseButton onClick={onClose}>
          <RiCloseLine size={24} />
        </CloseButton>

        <TitleContainer>
          <AppLabel size={18} style={{ fontWeight: 700 }}>
            {title}
          </AppLabel>
          {subtitle && <AppLabel size={16}>{subtitle}</AppLabel>}
        </TitleContainer>
      </SidebarHeader>
      {children}
    </SidebarContainer>
  );
}

export default RightSidebarModal;
