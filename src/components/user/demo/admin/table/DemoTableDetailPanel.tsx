import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { Table } from '@@types/index';
import { DEMO_TABLE_NUMBER } from '@constants/data/demo/demoSeed';
import { TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import TableInactivePanel from '@components/admin/order/table-manage/detail/TableInactivePanel';
import TableSessionStepper from '@components/admin/order/table-manage/detail/TableSessionStepper';
import TableUsageSummary from '@components/admin/order/table-manage/detail/TableUsageSummary';
import useConfirm from '@hooks/useConfirm';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getTableEndBlockMessage } from '@utils/demo/demoReducer';
import { getTableStatus } from '@utils/tableStatus';
import DemoTableDetailHeader from './DemoTableDetailHeader';
import DemoTableOrderCardList from './DemoTableOrderCardList';

const DEFAULT_TIME_LIMIT = 10;
const MIN_TIME_LIMIT = 1;

const Panel = styled.div`
  width: 100%;
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  overflow: hidden;
  background-color: ${Color.WHITE};
  ${colFlex()};
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
`;

const StepperArea = styled.div`
  width: 100%;
`;

// useConfirm 창은 캔버스 가운데 800×176이고 닫기 아이콘이 100px 위에 있다. 폰 확대가 둘 다 담도록 조금 넓게 잡는다
const CONFIRM_FOCUS_WIDTH_PX = 820;
const CONFIRM_FOCUS_HEIGHT_PX = 380;

const ConfirmFocusArea = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${CONFIRM_FOCUS_WIDTH_PX}px;
  height: ${CONFIRM_FOCUS_HEIGHT_PX}px;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const getTableFocus = (tableNumber: number, part: string) => {
  if (tableNumber !== DEMO_TABLE_NUMBER) return undefined;
  return `table-7-${part}`;
};

interface DemoTableDetailPanelProps {
  table: Table;
}

function DemoTableDetailPanel({ table }: DemoTableDetailPanelProps) {
  const state = useAtomValue(demoStateAtom);
  const { orders } = state;
  const dispatch = useSetAtom(demoStateAtom);
  const [minutes, setMinutes] = useState(DEFAULT_TIME_LIMIT);
  const [isConfirming, setIsConfirming] = useState(false);
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
      setIsConfirming(true);
      const confirmed = await confirm();
      setIsConfirming(false);
      if (!confirmed) return;
    }
    dispatch({ type: 'TABLE_END', tableNumber: table.tableNumber, now: Date.now() });
  };

  return (
    <PanelGroup>
      <Panel>
        <ScrollBody>
          <DemoTableDetailHeader table={table} status={status} />
          {session && <TableUsageSummary session={session} status={status} />}
          {session && (
            <StepperArea data-demo-focus={getTableFocus(table.tableNumber, 'extend')}>
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
          <EndButton type="button" data-demo-focus={getTableFocus(table.tableNumber, 'action')} onClick={handleEndClick}>
            사용 종료
          </EndButton>
        )}
        {!session && (
          <StartButton
            type="button"
            data-demo-focus={getTableFocus(table.tableNumber, 'action')}
            onClick={() => dispatch({ type: 'TABLE_START', tableNumber: table.tableNumber, now: Date.now() })}
          >
            사용 시작
          </StartButton>
        )}
      </Panel>
      <ConfirmModal />
      {isConfirming && <ConfirmFocusArea data-demo-focus={getTableFocus(table.tableNumber, 'confirm')} />}
    </PanelGroup>
  );
}

export default DemoTableDetailPanel;
