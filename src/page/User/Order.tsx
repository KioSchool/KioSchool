import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';
import useWorkspace from '../../hook/useWorkspace';
import { userWorkspaceAtom } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import AppBadge from '../../component/common/badge/AppBadge';

const Container = styled.div`
  width: 100vw;
  padding-top: 60px;
`;

const Header = styled.div`
  background: white;
  position: sticky;
  top: 0;
  width: 100vw;
  height: 110px;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const CategoryBadges = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
        <CategoryBadges>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
          <AppBadge>test</AppBadge>
        </CategoryBadges>
      </Header>
    </Container>
  );
}

export default Order;
