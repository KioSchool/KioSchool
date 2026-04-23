import NewCommonButton from '@components/common/button/NewCommonButton';
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
      <NewCommonButton
        onClick={() => {
          handleTableCount(tableCount + 1);
        }}
      >
        테이블 추가
      </NewCommonButton>
      <NewCommonButton
        onClick={() => {
          handleTableCount(tableCount - 1);
        }}
        disabled={tableCount === 1}
      >
        테이블 삭제
      </NewCommonButton>
      <NewCommonButton onClick={downloadQrCode}>QR코드 전체 다운로드</NewCommonButton>
    </ButtonContainer>
  );
}

export default AdminTableCountTitleNavBarChildren;
