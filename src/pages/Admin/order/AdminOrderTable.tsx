import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { adminWorkspaceAtom } from '@recoils/atoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const TableListContainer = styled.div<{ tableCount: number }>`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(216, 216, 216, 0.3);
  grid-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px;
`;

const TableCell = styled.div`
  width: 70px;
  height: 70px;
  background: #eeecec;
  text-align: center;
  line-height: 70px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${Color.KIO_ORANGE};
    color: ${Color.WHITE};
    transition: 0.2s;
  }
`;

function AdminOrderTable() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const workspace = useRecoilValue(adminWorkspaceAtom);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, [workspaceId, fetchWorkspace]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} titleNavBarProps={{ title: '테이블 주문 조회' }}>
      <Container className={'admin-workspace-container'}>
        <TableListContainer tableCount={workspace.tableCount}>
          {Array.from({ length: workspace.tableCount }, (_, index) => (
            <TableCell key={index}>{index + 1}번</TableCell>
          ))}
        </TableListContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminOrderTable;
