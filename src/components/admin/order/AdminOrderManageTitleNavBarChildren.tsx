import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';

interface Props {
  tableCount: number;
  handleTableCount: (tableNo: number) => void;
  downloadQrCode: () => void;
}

const ButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

function AdminTableCountTitleNavBarChildren({ handleTableCount, downloadQrCode, tableCount }: Props) {
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
      <RoundedAppButton onClick={downloadQrCode}>QR코드 전체 다운로드</RoundedAppButton>
    </ButtonContainer>
  );
}

export default AdminTableCountTitleNavBarChildren;
