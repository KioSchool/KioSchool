import React from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  height: 70px;
  background: ${Color.LIGHT_GREY};
`;

function WorkspaceNotice() {
  return <Container>WorkspaceNotice</Container>;
}

export default WorkspaceNotice;
