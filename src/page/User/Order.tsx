import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';
import useWorkspace from '../../hook/useWorkspace';
import { userWorkspaceAtom } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
`;

const Header = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const { fetchWorkspace } = useWorkspace();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <Container>
      <Header>
        <AppLabel size={'medium'}>{workspace.name}</AppLabel>
        <AppLabel size={'small'} style={{ color: 'gray' }}>
          this is table {tableNo}
        </AppLabel>
      </Header>
    </Container>
  );
}

export default Order;
