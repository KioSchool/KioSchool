import React from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import ChevronDownSvg from '@resources/svg/ChevronDownSvg';
import { expandButtonStyle } from '@styles/buttonStyles';

const Container = styled.div`
  width: 100%;
  height: 60px;
  margin: 15px 0;
  ${colFlex({ align: 'center' })}
`;

const NoticeContent = styled.div`
  border-radius: 8px;
  width: calc(100% - 40px);
  height: 100%;
  background: ${Color.LIGHT_GREY};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const OpenIcon = styled(ChevronDownSvg)`
  ${expandButtonStyle}
  padding-right: 5px;
  width: 25px;
  height: 25px;
`;

function WorkspaceNotice() {
  return (
    <Container>
      <NoticeContent>
        WorkspaceNotice
        <OpenIcon />
      </NoticeContent>
    </Container>
  );
}

export default WorkspaceNotice;
