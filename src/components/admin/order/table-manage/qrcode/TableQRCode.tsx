import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { QRCodeCanvas } from 'qrcode.react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import QRCode from 'qrcode';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  width: 188px;
  height: 188px;
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  background-color: #f0f5f8;
  border-bottom: 1px solid #ececec;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  gap: 10px;
  flex: 1;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Label = styled.span`
  color: ${Color.GREY};
  font-size: 15px;
  font-weight: 600;
`;

interface TableQRCodeProps {
  workspaceId: string | undefined;
  selectedTable: Table;
}

function TableQRCode({ workspaceId, selectedTable }: TableQRCodeProps) {
  const qrCodeUrl = `${location.origin}/order?workspaceId=${workspaceId}&tableNo=${selectedTable.tableNumber}`;
  const onClickDownloadQRCode = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(qrCodeUrl, {
        width: 200,
        errorCorrectionLevel: 'H',
        margin: 5,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `테이블${selectedTable.tableNumber} QR코드.png`;
      link.click();
    } catch (err) {
      console.error(err);
      alert('QR 코드 생성에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Header>
        <Label>QR</Label>
      </Header>
      <Content>
        <QRCodeCanvas value={qrCodeUrl} size={70} bgColor="#ffffff" fgColor="#000000" level="M" />
        <NewCommonButton size={'xs'} onClick={onClickDownloadQRCode}>
          다운로드
        </NewCommonButton>
      </Content>
    </Container>
  );
}

export default TableQRCode;
