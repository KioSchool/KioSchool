import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import ChevronDownSvg from '@resources/svg/ChevronDownSvg';

const Container = styled.div<{ expanded: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  margin: 15px 0;
  height: auto;
  ${colFlex({ align: 'center' })}
`;

const NoticeContent = styled.div<{ expanded: boolean }>`
  width: 100%;
  height: ${({ expanded }) => (expanded ? 'auto' : '100%')};
  background: ${Color.LIGHT_GREY};
  border-radius: 8px;
  overflow: hidden;
  ${({ expanded }) => rowFlex({ justify: 'space-between', align: expanded ? 'end' : 'center' })}
`;

const expandedStyle = `
  white-space: pre-wrap;
`;

const unExpandedStyle = `
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Notice = styled.p<{ expanded: boolean }>`
  padding-left: 5px;
  width: 80%;
  font-size: 13px;
  ${({ expanded }) => (expanded ? expandedStyle : unExpandedStyle)}
`;

const ToggleIcon = styled(ChevronDownSvg, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  width: 25px;
  height: 25px;
  transition: transform 0.3s;
  transform: rotate(${({ expanded }) => (expanded ? '180deg' : '0deg')});
  padding-top: ${({ expanded }) => (expanded ? '8px' : '')};
`;

interface WorkspaceNoticeProps {
  notice: string;
}

function WorkspaceNotice({ notice }: WorkspaceNoticeProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Container expanded={expanded}>
      <NoticeContent expanded={expanded}>
        <Notice expanded={expanded}>{notice}</Notice>
        <ToggleIcon expanded={expanded} onClick={toggleExpand} />
      </NoticeContent>
    </Container>
  );
}

export default WorkspaceNotice;
