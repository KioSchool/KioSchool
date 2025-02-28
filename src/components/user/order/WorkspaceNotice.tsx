import React from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 70px;
  ${colFlex({ align: 'center' })}
`;

const NoticeContent = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  background: ${Color.LIGHT_GREY};
`;

function WorkspaceNotice() {
  return (
    <Container>
      <NoticeContent>WorkspaceNotice</NoticeContent>
    </Container>
  );
}

export default WorkspaceNotice;
