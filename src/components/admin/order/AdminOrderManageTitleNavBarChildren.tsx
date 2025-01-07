import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';

interface Props {
  tableCount: number;
  handleTableCount: (tableNo: number) => void;
}

const ButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

function AdminTableCountTitleNavBarChildren({ handleTableCount, tableCount }: Props) {
  return (
    <ButtonContainer className={'button-container'}>
      <RoundedAppButton
        onClick={() => {
          handleTableCount(tableCount + 1);
        }}
      >
        테이블 추가
      </RoundedAppButton>
      <RoundedAppButton
        onClick={() => {
          handleTableCount(tableCount - 1);
        }}
        disabled={tableCount === 1}
      >
        테이블 삭제
      </RoundedAppButton>
    </ButtonContainer>
  );
}

export default AdminTableCountTitleNavBarChildren;
