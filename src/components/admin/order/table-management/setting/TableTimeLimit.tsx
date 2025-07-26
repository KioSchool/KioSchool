import { Checkbox } from '@mui/material';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';

const Container = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #ececec;
  border-radius: 10px;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 5px 15px;
  background-color: ${Color.LIGHT_GREY};
  font-size: 15px;
  font-weight: 400;
  border-bottom: 1px solid #ececec;
  ${rowFlex({ justify: 'center', align: 'center' })};

  label {
    color: ${Color.GREY};
  }
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const InputContainer = styled.div<{ disabled: boolean }>`
  box-sizing: border-box;
  padding: 7px 5px;
  border-radius: 50px;
  background-color: ${({ disabled }) => (disabled ? '#f0f0f0' : '#f8f8f8')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Input = styled.input<{ disabled: boolean }>`
  width: 140px;
  text-align: center;
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? Color.GREY : Color.BLACK)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const MinusButton = styled(RiSubtractFill)<{ disabled: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ disabled }) => (disabled ? Color.GREY : Color.KIO_ORANGE)};
  background-color: ${({ disabled }) => (disabled ? '#e0e0e0' : Color.WHITE)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const PlusButton = styled(RiAddFill)<{ disabled: boolean }>`
  width: 20px;
  height: 20px;
  color: ${({ disabled }) => (disabled ? Color.GREY : Color.WHITE)};
  background-color: ${({ disabled }) => (disabled ? '#e0e0e0' : Color.KIO_ORANGE)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

function TableTimeLimit() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const { updateWorkspaceOrderSetting } = useAdminWorkspace();

  const [isTimeLimited, setIsTimeLimited] = useState(workspace.workspaceSetting.useOrderSessionTimeLimit);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(workspace.workspaceSetting.orderSessionTimeLimitMinutes);

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTimeLimited(e.target.checked);
  };

  const handleMinusClick = () => {
    setTimeLimitMinutes((prev) => Math.max(1, prev - 1));
  };

  const handlePlusClick = () => {
    setTimeLimitMinutes((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setTimeLimitMinutes(value);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
  };

  const handleConfirm = () => {
    updateWorkspaceOrderSetting(workspaceId, isTimeLimited, timeLimitMinutes)
      .then(() => {
        alert(`테이블 시간 제한이 ${isTimeLimited ? '활성화' : '비활성화'}되었습니다.`);
      })
      .catch(() => {
        alert('테이블 시간 제한 설정에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <Container>
      <Header>
        <label>테이블 시간 제한</label>
        <Checkbox
          checked={isTimeLimited}
          onChange={handleTimeLimitChange}
          sx={{
            color: Color.GREY,
            '&.Mui-checked': {
              color: Color.KIO_ORANGE,
            },
          }}
        />
      </Header>
      <Content>
        <InputContainer disabled={!isTimeLimited}>
          <MinusButton disabled={!isTimeLimited} onClick={handleMinusClick} />
          <Input type="text" disabled={!isTimeLimited} value={formatTime(timeLimitMinutes)} onChange={handleInputChange} readOnly />
          <PlusButton disabled={!isTimeLimited} onClick={handlePlusClick} />
        </InputContainer>
        <RoundedAppButton fontSize={'16px'} onClick={handleConfirm}>
          확인
        </RoundedAppButton>
      </Content>
    </Container>
  );
}

export default TableTimeLimit;
