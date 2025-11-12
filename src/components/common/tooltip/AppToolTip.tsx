import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import React, { useState } from 'react';

const Container = styled.div`
  position: relative;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const PopupContainer = styled.div`
  position: absolute;
  width: max-content;
  left: 0;
  max-width: 460px;
  height: 28px;
  bottom: 110%;
  white-space: pre-line;
  font-size: 13px;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  padding: 0 12px;
  border-radius: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface AppTooltipProps {
  children: React.ReactNode;
  content: string;
}

function AppTooltip({ children, content }: AppTooltipProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <Container onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {children}
      {isHover && <PopupContainer>{content}</PopupContainer>}
    </Container>
  );
}

export default AppTooltip;
