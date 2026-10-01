import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { RiArrowRightSLine, RiInformationLine } from '@remixicon/react';
import { useAtomValue } from 'jotai';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useVisiblePolling from '@hooks/common/useVisiblePolling';
import { adminTablesAtom } from '@jotai/admin/atoms';
import { TABLE_POLL_INTERVAL_MS } from '@constants/layout';
import { getAdminTableRealtimePath } from '@constants/routes';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { getTableStatus, TABLE_STATUS } from '@utils/tableStatus';

const ICON_SIZE_PX = 18;

const Container = styled.div<{ isWarning: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ isWarning }) => (isWarning ? Color.KIO_ORANGE_ICON_BG : Color.BORDER_GREY)};
  border-radius: 10px;
  background: ${({ isWarning }) => (isWarning ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Message = styled.div`
  min-width: 0;
  gap: 8px;
  font-size: 13px;
  word-break: keep-all;
  color: ${Color.TEXT_BODY};
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const WarningIcon = styled(RiInformationLine)`
  flex-shrink: 0;
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
  color: ${Color.KIO_ORANGE_DARK};
`;

const Strong = styled.strong`
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const TableLink = styled(Link)`
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  color: ${Color.KIO_ORANGE_DARK};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LinkArrow = styled(RiArrowRightSLine)`
  width: ${ICON_SIZE_PX}px;
  height: ${ICON_SIZE_PX}px;
`;

interface TableUsageSummaryProps {
  workspaceId: string | undefined;
}

function TableUsageSummary({ workspaceId }: TableUsageSummaryProps) {
  const { fetchWorkspaceTables } = useAdminWorkspace();
  const tables = useAtomValue(adminTablesAtom);
  const tablesInUseCount = tables.filter((table) => getTableStatus(table) !== TABLE_STATUS.EMPTY).length;
  const hasNoTableInUse = tablesInUseCount === 0;

  const fetchTables = () => {
    if (!workspaceId) return;
    fetchWorkspaceTables(workspaceId, { skipGlobalLoading: true }).catch(() => {});
  };

  useEffect(() => {
    fetchTables();
  }, [workspaceId]);

  useVisiblePolling(fetchTables, TABLE_POLL_INTERVAL_MS, Boolean(workspaceId));

  if (!workspaceId || tables.length === 0) return null;

  return (
    <Container isWarning={hasNoTableInUse} role="status">
      {hasNoTableInUse ? (
        <Message>
          <WarningIcon />
          <span>
            <Strong>사용 중인 테이블이 없습니다.</Strong> 테이블 사용을 시작해야 손님이 주문할 수 있습니다.
          </span>
        </Message>
      ) : (
        <Message>
          <span>
            테이블{' '}
            <Strong>
              {tablesInUseCount} / {tables.length}
            </Strong>{' '}
            사용 중
          </span>
        </Message>
      )}
      <TableLink to={getAdminTableRealtimePath(workspaceId)}>
        테이블 관리
        <LinkArrow />
      </TableLink>
    </Container>
  );
}

export default TableUsageSummary;
