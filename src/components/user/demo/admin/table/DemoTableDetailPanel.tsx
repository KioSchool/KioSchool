import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { Table } from '@@types/index';
import { TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import TableInactivePanel from '@components/admin/order/table-manage/detail/TableInactivePanel';
import TableSessionStepper from '@components/admin/order/table-manage/detail/TableSessionStepper';
import TableUsageSummary from '@components/admin/order/table-manage/detail/TableUsageSummary';
import useConfirm from '@hooks/useConfirm';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getDemoTableFocus } from '@utils/demo/demoFocus';
import { getTableEndBlockMessage } from '@utils/demo/demoReducer';
import { getTableStatus } from '@utils/tableStatus';
import DemoTableDetailHeader from './DemoTableDetailHeader';
import DemoTableOrderCardList from './DemoTableOrderCardList';

const DEFAULT_TIME_LIMIT = 10;
const MIN_TIME_LIMIT = 1;

const mobilePanelStyle = css`
  height: 100%;
  border: 0;
  border-radius: 0;
`;

const Panel = styled.div<{ isMobile: boolean }>`
  width: 100%;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  overflow: hidden;
  background-color: ${Color.WHITE};
  ${colFlex()};
  ${({ isMobile }) => isMobile && mobilePanelStyle}
`;

const ScrollBody = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding: 16px;
  gap: 14px;
  overflow-y: auto;
  ${colFlex()};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  background-color: ${Color.BORDER_GREY};
`;

const footerButtonStyle = css`
  width: 100%;
  height: 52px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const EndButton = styled.button`
  ${footerButtonStyle}
  border-top: 1px solid ${Color.BORDER_GREY};
  background-color: ${Color.WHITE};
  color: ${Color.TEXT_DEFAULT};

  &:hover {
    background-color: #fcfcfc;
  }
`;

const StartButton = styled.button`
  ${footerButtonStyle}
  background-color: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};

  &:hover {
    background-color: #ffaf70;
  }
`;

const PanelGroup = styled.div`
  width: 100%;
  height: 100%;
`;

const StepperArea = styled.div`
  width: 100%;
`;

interface DemoTableDetailPanelProps {
  table: Table;
  isMobile?: boolean;
}

function DemoTableDetailPanel({ table, isMobile = false }: DemoTableDetailPanelProps) {
  const state = useAtomValue(demoStateAtom);
  const { orders } = state;
  const dispatch = useSetAtom(demoStateAtom);
  const [minutes, setMinutes] = useState(DEFAULT_TIME_LIMIT);
  const status = getTableStatus(table);
  const session = table.orderSession;
  const sessionOrders = orders
    .filter((order) => session !== null && order.tableNumber === table.tableNumber && order.orderSession?.id === session.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const { ConfirmModal, confirm } = useConfirm({
    title: '세션을 종료하시겠습니까?',
    description: '종료 후 되돌릴 수 없습니다.',
    okText: '종료',
    cancelText: '취소',
  });

  const handleEndClick = async () => {
    if (!getTableEndBlockMessage(state, table.tableNumber)) {
      const confirmed = await confirm();
      if (!confirmed) return;
    }
    dispatch({ type: 'TABLE_END', tableNumber: table.tableNumber, now: Date.now() });
  };

  return (
    <PanelGroup>
      <Panel isMobile={isMobile}>
        <ScrollBody>
          <DemoTableDetailHeader table={table} status={status} />
          {session && <TableUsageSummary session={session} status={status} />}
          {session && (
            <StepperArea data-demo-focus={getDemoTableFocus(table.tableNumber, 'extend')}>
              <TableSessionStepper
                minutes={minutes}
                onChangeMinutes={setMinutes}
                onIncrementMinutes={() => setMinutes((prev) => prev + 1)}
                onDecrementMinutes={() => setMinutes((prev) => Math.max(MIN_TIME_LIMIT, prev - 1))}
                onDecreaseTime={() => dispatch({ type: 'TABLE_EXTEND', tableNumber: table.tableNumber, minutes: -minutes })}
                onIncreaseTime={() => dispatch({ type: 'TABLE_EXTEND', tableNumber: table.tableNumber, minutes })}
                disabled={false}
              />
            </StepperArea>
          )}
          {session && <Divider />}
          {session && <DemoTableOrderCardList orders={sessionOrders} />}
          {!session && <TableInactivePanel />}
        </ScrollBody>
        {session && (
          <EndButton type="button" data-demo-focus={getDemoTableFocus(table.tableNumber, 'action')} onClick={handleEndClick}>
            사용 종료
          </EndButton>
        )}
        {!session && (
          <StartButton
            type="button"
            data-demo-focus={getDemoTableFocus(table.tableNumber, 'action')}
            onClick={() => dispatch({ type: 'TABLE_START', tableNumber: table.tableNumber, now: Date.now() })}
          >
            사용 시작
          </StartButton>
        )}
      </Panel>
      <ConfirmModal />
    </PanelGroup>
  );
}

export default DemoTableDetailPanel;
