import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { colFlex } from '@styles/flexStyles';
import TableTimeSetting from './TableTimeSetting';
import TableQRDownload from './TableQRDownload';
import NumberInput from '@components/common/input/NumberInput';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 0 70px 0;
  gap: 8px;
  position: relative;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #464a4d;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 6px 0;
  background-color: #e8eef2;
`;

const SaveButton = styled(NewCommonButton)`
  width: 100%;
  max-width: 250px;
  margin-top: 120px;
  position: absolute;
  bottom: 40px;
`;

function TableSettingsSidebar() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const { updateWorkspaceTableCount, updateWorkspaceOrderSetting } = useAdminWorkspace();

  const [tableCount, setTableCount] = useState(workspace.tableCount || 1);
  const [isTimeLimited, setIsTimeLimited] = useState(workspace.workspaceSetting?.useOrderSessionTimeLimit ?? false);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(workspace.workspaceSetting?.orderSessionTimeLimitMinutes ?? 60);

  const isDirty = useMemo(() => {
    return (
      tableCount !== workspace.tableCount ||
      isTimeLimited !== workspace.workspaceSetting?.useOrderSessionTimeLimit ||
      timeLimitMinutes !== workspace.workspaceSetting?.orderSessionTimeLimitMinutes
    );
  }, [tableCount, isTimeLimited, timeLimitMinutes, workspace]);

  const handleTableCountMinus = () => {
    setTableCount(Math.max(1, tableCount - 1));
  };

  const handleTableCountPlus = () => {
    setTableCount(tableCount + 1);
  };

  const handleTableCountChange = (value: number) => {
    setTableCount(Math.max(1, value));
  };

  const handleSave = async () => {
    if (tableCount < 1) {
      alert('테이블 수는 1 이상이어야 합니다.');
      return;
    }

    if (isTimeLimited && (timeLimitMinutes === undefined || timeLimitMinutes < 1)) {
      alert('시간 제한은 1분 이상이어야 합니다.');
      return;
    }

    try {
      await Promise.all([updateWorkspaceTableCount(workspaceId, tableCount), updateWorkspaceOrderSetting(workspaceId, isTimeLimited, timeLimitMinutes)]);
    } catch (error) {
      console.error('설정 저장 실패:', error);
      alert('설정 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Container>
        <TableQRDownload workspaceId={workspaceId} workspaceName={workspace.name} tableCount={workspace.tableCount} />

        <Divider />

        <SectionLabel>테이블 개수</SectionLabel>
        <NumberInput
          value={tableCount}
          formatter={(v) => `${v}개`}
          onChange={handleTableCountChange}
          onIncrement={handleTableCountPlus}
          onDecrement={handleTableCountMinus}
        />

        <Divider />

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
    </>
  );
}

export default TableSettingsSidebar;
