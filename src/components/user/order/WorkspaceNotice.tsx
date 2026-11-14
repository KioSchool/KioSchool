import { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiArrowDownSLine } from '@remixicon/react';

const Container = styled.div<{ expanded: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  margin: 15px 0 30px 0;
  height: auto;
  ${colFlex({ align: 'center' })}
`;

const NoticeContent = styled.div<{ expanded: boolean }>`
  width: 100%;
  height: ${({ expanded }) => (expanded ? 'auto' : '100%')};
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  border-radius: 12px;
  overflow: hidden;
  padding: 2px 12px 2px 16px;
  ${({ expanded }) => rowFlex({ justify: 'space-between', align: expanded ? 'end' : 'center' })}
`;

const unExpandedStyle = `
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Notice = styled.p<{ expanded: boolean }>`
  width: 80%;
  color: ${Color.TEXT_DEFAULT};
  font-size: 13px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: keep-all;
  ${({ expanded }) => !expanded && unExpandedStyle}
`;

const ToggleIcon = styled(RiArrowDownSLine, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  width: 22px;
  height: 22px;
  color: ${Color.TEXT_HINT};
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
