import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminWorkspaceAtom, adminTablesAtom } from '@jotai/admin/atoms';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import NewCommonButton from '@components/common/button/NewCommonButton';
import SettingSection from './SettingSection';
import { colFlex } from '@styles/flexStyles';
import { getAdminWorkspacePath } from '@constants/routes';
import { MAX_TABLE_COUNT } from '@constants/layout';
import { getTableStatus, TABLE_STATUS } from '@utils/tableStatus';
import TableTimeSetting from './TableTimeSetting';
import TableQRDownload from './TableQRDownload';
import NumberInput from '@components/common/input/NumberInput';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 0 24px 0;
  gap: 16px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const CountCaption = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
`;

const SaveButton = styled(NewCommonButton)`
  width: 100%;
  margin-top: auto;
`;

function TableSettingsSidebar() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const tables = useAtomValue(adminTablesAtom);
  const { updateWorkspaceTableCount, updateWorkspaceOrderSetting } = useAdminWorkspace();

  const navigate = useNavigate();

  const [tableCount, setTableCount] = useState(workspace.tableCount || 1);
  const [isTimeLimited, setIsTimeLimited] = useState(workspace.workspaceSetting?.useOrderSessionTimeLimit ?? false);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(workspace.workspaceSetting?.orderSessionTimeLimitMinutes ?? 60);

  const isDirty =
    tableCount !== workspace.tableCount ||
    isTimeLimited !== workspace.workspaceSetting?.useOrderSessionTimeLimit ||
    timeLimitMinutes !== workspace.workspaceSetting?.orderSessionTimeLimitMinutes;

  const handleTableCountMinus = () => {
    setTableCount(Math.max(1, tableCount - 1));
  };

  const handleTableCountPlus = () => {
    setTableCount(Math.min(MAX_TABLE_COUNT, tableCount + 1));
  };

  const handleTableCountChange = (value: number) => {
    setTableCount(Math.min(MAX_TABLE_COUNT, Math.max(1, value)));
  };

  const getStrandedTableNumbers = () =>
    tables.filter((table) => table.tableNumber > tableCount && getTableStatus(table) !== TABLE_STATUS.EMPTY).map((table) => table.tableNumber);

  const handleSave = async () => {
    if (tableCount < 1) {
      alert('테이블 수는 1 이상이어야 합니다.');
      return;
    }

    if (isTimeLimited && (timeLimitMinutes === undefined || timeLimitMinutes < 1)) {
      alert('시간 제한은 1분 이상이어야 합니다.');
      return;
    }

    const stranded = getStrandedTableNumbers();
    if (stranded.length > 0) {
      const confirmed = window.confirm(`${stranded.join(', ')}번 테이블이 사용 중입니다.\n계속하면 이 테이블들이 화면에서 사라집니다. 진행할까요?`);
      if (!confirmed) return;
    }

    const shouldRedirectToOnboarding = workspace.isOnboarding && tableCount >= 2 && Boolean(workspaceId);

    try {
      await Promise.all([updateWorkspaceTableCount(workspaceId, tableCount), updateWorkspaceOrderSetting(workspaceId, isTimeLimited, timeLimitMinutes)]);

      if (shouldRedirectToOnboarding) {
        navigate(getAdminWorkspacePath(Number(workspaceId)));
      }
    } catch (error) {
      console.error('설정 저장 실패:', error);
      alert('설정 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <TableQRDownload workspaceId={workspaceId} workspaceName={workspace.name} tables={tables} />

      <SettingSection label="테이블 개수">
        <NumberInput
          value={tableCount}
          formatter={(v) => `${v}개`}
          maxWidth="100%"
          onChange={handleTableCountChange}
          onIncrement={handleTableCountPlus}
          onDecrement={handleTableCountMinus}
        />
        <CountCaption>최대 {MAX_TABLE_COUNT}개까지 만들 수 있어요</CountCaption>
      </SettingSection>

      <TableTimeSetting
        isTimeLimited={isTimeLimited}
        timeLimitMinutes={timeLimitMinutes}
        onTimeLimitedChange={setIsTimeLimited}
        onMinutesChange={setTimeLimitMinutes}
      />

      <SaveButton size={'xs'} onClick={handleSave} disabled={!isDirty}>
        적용
      </SaveButton>
    </Container>
  );
}

export default TableSettingsSidebar;
