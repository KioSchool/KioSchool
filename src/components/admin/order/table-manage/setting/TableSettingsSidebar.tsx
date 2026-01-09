import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { useAtomValue } from 'jotai';
import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import TableTimeSetting from './TableTimeSetting';
import TableQRDownload from './TableQRDownload';

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

const InputContainer = styled.div<{ disabled?: boolean }>`
  box-sizing: border-box;
  padding: 2px 4px;
  border-radius: 45px;
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : '#ffffff')};
  border: 1px solid #e8eef2;
  height: 28px;
  width: 100%;
  max-width: 250px;
  ::selection {
    background: none;
  }

  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Input = styled.input<{ disabled?: boolean }>`
  min-width: 50px;
  text-align: center;
  background: none;
  border: none;
  font-size: 13px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : '#464a4d')};

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const MinusButton = styled(RiSubtractFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : Color.KIO_ORANGE)};
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : Color.WHITE)};
  border: ${({ disabled }) => (disabled ? 'none' : `1px solid ${Color.KIO_ORANGE}`)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
`;

const PlusButton = styled(RiAddFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : Color.WHITE)};
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : Color.KIO_ORANGE)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
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

  const [tableCount, setTableCount] = useState(workspace.tableCount);
  const [isTimeLimited, setIsTimeLimited] = useState(workspace.workspaceSetting?.useOrderSessionTimeLimit);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(workspace.workspaceSetting?.orderSessionTimeLimitMinutes);

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

  const handleSave = async () => {
    if (tableCount < 1) {
      alert('테이블 수는 1 이상이어야 합니다.');
      return;
    }

    if (isTimeLimited && timeLimitMinutes < 1) {
      alert('시간 제한은 1분 이상이어야 합니다.');
      return;
    }

    try {
      await Promise.all([updateWorkspaceTableCount(workspaceId, tableCount), updateWorkspaceOrderSetting(workspaceId, isTimeLimited, timeLimitMinutes)]);
    } catch (error) {
      alert('설정 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Container>
        <TableQRDownload workspaceId={workspaceId} workspaceName={workspace.name} tableCount={workspace.tableCount} />

        <Divider />

        <SectionLabel>테이블 개수</SectionLabel>
        <InputContainer>
          <MinusButton onClick={handleTableCountMinus} />
          <Input type="text" value={`${tableCount}개`} readOnly />
          <PlusButton onClick={handleTableCountPlus} />
        </InputContainer>

        <Divider />

        <TableTimeSetting
          isTimeLimited={isTimeLimited}
          timeLimitMinutes={timeLimitMinutes}
          onTimeLimitedChange={setIsTimeLimited}
          onMinutesChange={setTimeLimitMinutes}
        />
        <SaveButton size="xs" onClick={handleSave} disabled={!isDirty}>
          적용
        </SaveButton>
      </Container>
    </>
  );
}

export default TableSettingsSidebar;
