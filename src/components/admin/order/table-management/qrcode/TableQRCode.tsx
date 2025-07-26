import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { QRCodeCanvas } from 'qrcode.react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import QRCode from 'qrcode';

const Container = styled.div`
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
  color: ${Color.GREY};
  background-color: ${Color.LIGHT_GREY};
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
  gap: 25px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Button = styled.button`
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 8px;
  width: 90%;
  height: 30px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${Color.WHITE};
    background: ${Color.KIO_ORANGE};
  }
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
      <Header>QR 코드</Header>
      <Content>
        <QRCodeCanvas value={qrCodeUrl} size={80} bgColor="#ffffff" fgColor="#000000" level="M" />
        <Button onClick={onClickDownloadQRCode}>QR 다운로드</Button>
      </Content>
    </Container>
  );
}

export default TableQRCode;
