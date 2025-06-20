import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${colFlex({ align: 'center' })}
`;

const TableListContainer = styled.div<{ tableCount: number }>`
  max-height: 400px;
  min-height: 400px;
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(216, 216, 216, 0.3);

  row-gap: 15px;
  column-gap: 40px;
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
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const { appendPathWithPage } = useCustomNavigate();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{
        title: '테이블 주문 조회',
        subTitle: '테이블 별 주문 내역을 조회합니다.',
        onLeftArrowClick: () => navigate(`/admin/workspace/${workspaceId}`),
      }}
    >
      <Container className={'admin-order-table-count-container'}>
        <TableListContainer tableCount={workspace.tableCount} className={'table-count-list-container'}>
          {Array.from({ length: workspace.tableCount }, (_, index) => (
            <TableCell key={index} onClick={() => appendPathWithPage(`/${index + 1}`)}>
              {index + 1}번
            </TableCell>
          ))}
        </TableListContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminOrderTable;
