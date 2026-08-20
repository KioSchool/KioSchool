import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { useTableSession } from '@hooks/admin/useTableSession';
import { getTableStatus } from '@utils/tableStatus';
import TableDetailHeader from '@components/admin/order/table-manage/detail/TableDetailHeader/TableDetailHeader';
import TableUsageSummary from '@components/admin/order/table-manage/detail/TableUsageSummary/TableUsageSummary';
import TableSessionStepper from '@components/admin/order/table-manage/detail/TableSessionStepper/TableSessionStepper';
import TableOrderCardList from '@components/admin/order/table-manage/detail/TableOrderCardList/TableOrderCardList';
import TableInactivePanel from '@components/admin/order/table-manage/detail/TableInactivePanel/TableInactivePanel';
import { Order, Table } from '@@types/index';

const FALLBACK_SESSION_LIMIT_MINUTES = 60;

const Panel = styled.div`
  width: 100%;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  box-sizing: border-box;
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex()};
`;

const ScrollBody = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding: 14px;
  gap: 16px;
  overflow-y: auto;
  ${colFlex()};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  background-color: #ececec;
`;

const FooterButton = styled.button<{ variant: 'start' | 'end' }>`
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'end' ? Color.BLACK : Color.KIO_ORANGE)};
  color: ${Color.WHITE};
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    opacity: 0.9;
  }
`;

interface TableDetailPanelProps {
  workspaceId: string | undefined;
  workspaceName: string;
  table: Table;
  orders: Order[];
  totalOrderAmount: number;
  refetchTable: () => void;
}

function TableDetailPanel({ workspaceId, workspaceName, table, orders, totalOrderAmount, refetchTable }: TableDetailPanelProps) {
  const status = getTableStatus(table);
  const session = table.orderSession;
  const workspace = useAtomValue(adminWorkspaceAtom);
  const setting = workspace?.workspaceSetting;

  const {
    selectedTimeLimit,
    setTimeLimit,
    handleIncrement,
    handleDecrement,
    handleDecreaseTime,
    handleIncreaseTime,
    handleEndSession,
    handleStartSession,
    EndSessionConfirmModal,
    EmptySessionConfirmModal,
  } = useTableSession({
    workspaceId,
    currentExpectedEndAt: session?.expectedEndAt,
    orderSessionId: session?.id,
    tableNumber: table.tableNumber,
    refetchTable,
  });

  const isStepperDisabled = !session || !setting?.useOrderSessionTimeLimit;
  const stepperMinutes = isStepperDisabled ? setting?.orderSessionTimeLimitMinutes ?? FALLBACK_SESSION_LIMIT_MINUTES : Number(selectedTimeLimit);

  return (
    <>
      <Panel>
        <ScrollBody>
          <TableDetailHeader table={table} status={status} workspaceId={workspaceId} workspaceName={workspaceName} />
          {session ? (
            <>
              <TableUsageSummary session={session} status={status} />
              <TableSessionStepper
                minutes={stepperMinutes}
                onChangeMinutes={setTimeLimit}
                onIncrementMinutes={handleIncrement}
                onDecrementMinutes={handleDecrement}
                onDecreaseTime={handleDecreaseTime}
                onIncreaseTime={handleIncreaseTime}
                disabled={isStepperDisabled}
              />
              <Divider />
              <TableOrderCardList orders={orders} totalOrderAmount={totalOrderAmount} />
            </>
          ) : (
            <TableInactivePanel />
          )}
        </ScrollBody>
        {session ? (
          <FooterButton type="button" variant="end" onClick={handleEndSession}>
            사용 종료
          </FooterButton>
        ) : (
          <FooterButton type="button" variant="start" onClick={handleStartSession}>
            사용 시작
          </FooterButton>
        )}
      </Panel>
      <EndSessionConfirmModal />
      <EmptySessionConfirmModal />
    </>
  );
}

export default TableDetailPanel;
