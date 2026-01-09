import styled from '@emotion/styled';
import { Table } from '@@types/index';
import { QRCodeCanvas } from 'qrcode.react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import QRCode from 'qrcode';
import { RiDownloadLine } from '@remixicon/react';

const Container = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  background-color: ${Color.LIGHT_GREY};
  border-bottom: 1px solid #ececec;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const DownloadIcon = styled(RiDownloadLine)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: ${Color.GREY};
  width: 20px;
  height: 20px;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 20px;
  gap: 25px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Button = styled.button`
  background: #e8eef2;
  color: #464a4d;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  padding: 0;
  width: 50%;
  height: 32px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: #d9e3e8;
  }
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
  const baseUrl = location.origin;
  const previewUrl = `${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${selectedTable.tableNumber}`;

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

  const onClickOrderLink = () => {
    window.open(previewUrl, '_blank');
  };

  return (
    <Container>
      <Header>
        <Label>QR 코드</Label>
        <DownloadIcon onClick={onClickDownloadQRCode} />
      </Header>
      <Content>
        <QRCodeCanvas value={qrCodeUrl} size={80} bgColor="#ffffff" fgColor="#000000" level="M" />
        <Button onClick={onClickOrderLink}>주문하기 링크</Button>
      </Content>
    </Container>
  );
}

export default TableQRCode;
