import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
`;

const Header = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Order() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  return (
    <Container>
      <Header>
        <AppLabel size={'medium'}>test</AppLabel>
      </Header>
      {workspaceId}-{tableNo} 테이블
    </Container>
  );
}

export default Order;
