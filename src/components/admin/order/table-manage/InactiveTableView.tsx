import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { useTableSession } from '@hooks/admin/useTableSession';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background: rgba(70, 74, 77, 0.05);
  z-index: 1;
  gap: 15px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${Color.GREY};
`;

const Subtitle = styled.div`
  font-size: 16px;
  color: ${Color.GREY};
`;

interface InactiveTableViewProps {
  workspaceId: string | undefined;
  tableNumber: number;
  refetchTable: () => void;
}

function InactiveTableView({ workspaceId, tableNumber, refetchTable }: InactiveTableViewProps) {
  const { handleStartSession } = useTableSession({
    workspaceId,
    currentExpectedEndAt: undefined,
    orderSessionId: undefined,
    tableNumber,
    refetchTable,
  });

  return (
    <Overlay>
      <Title>아래 버튼을 눌러 테이블 사용을 시작해주세요.</Title>
      <Subtitle>*사용 상태가 아닐 경우, 주문이 불가합니다.</Subtitle>
      <NewCommonButton size={'sm'} onClick={handleStartSession}>
        사용 시작
      </NewCommonButton>
    </Overlay>
  );
}

export default InactiveTableView;
