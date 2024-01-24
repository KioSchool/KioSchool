import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
`;

function Order() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  return (
    <Container>
      {workspaceId}-{tableNo} 테이블
    </Container>
  );
}

export default Order;
