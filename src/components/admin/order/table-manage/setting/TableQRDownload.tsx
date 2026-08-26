import styled from '@emotion/styled';
import { useRef } from 'react';
import QRCode from 'qrcode';
import { QRCodeCanvas } from 'qrcode.react';
import { downloadDataUrl, downloadQRGrid } from '@utils/qrCode';
import NewCommonButton from '@components/common/button/NewCommonButton';
import SettingSection from './SettingSection';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Table } from '@@types/index';

const Row = styled.div`
  width: 100%;
  gap: 8px;

  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const TextBlock = styled.div`
  min-width: 0;
  gap: 2px;

  ${colFlex()};
`;

const RowTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.GREY};
`;

const RowCaption = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
  word-break: keep-all;
`;

const QRContainer = styled.div`
  display: none;
`;

interface TableQRDownloadProps {
  workspaceId?: string;
  workspaceName: string;
  tables: Table[];
}

function TableQRDownload({ workspaceId, workspaceName, tables }: TableQRDownloadProps) {
  const QRCodeContainerRef = useRef<HTMLDivElement>(null);
  const baseUrl = location.origin;

  const downloadAllQrCode = () => {
    downloadQRGrid(QRCodeContainerRef.current, `${workspaceName}-모든-QR코드.png`);
  };

  const downloadPreviewQrCode = () => {
    const previewUrl = `${baseUrl}/order?workspaceId=${workspaceId}&tableNo=1&preview=true`;

    QRCode.toDataURL(previewUrl, {
      width: 200,
      errorCorrectionLevel: 'H',
      margin: 5,
    })
      .then((dataUrl) => downloadDataUrl(dataUrl, '미리보기_QR코드.png'))
      .catch((err) => {
        console.error(err);
        alert('QR 코드 생성에 실패했습니다.');
      });
  };

  return (
    <SettingSection label="QR 코드">
      <Row>
        <TextBlock>
          <RowTitle>전체 QR</RowTitle>
          <RowCaption>모든 테이블 QR 한 장</RowCaption>
        </TextBlock>
        <NewCommonButton size="xs" color="blue_gray" onClick={downloadAllQrCode}>
          다운로드
        </NewCommonButton>
      </Row>
      <Row>
        <TextBlock>
          <RowTitle>미리보기 QR</RowTitle>
          <RowCaption>주문 화면 미리보기용</RowCaption>
        </TextBlock>
        <NewCommonButton size="xs" color="blue_gray" onClick={downloadPreviewQrCode}>
          다운로드
        </NewCommonButton>
      </Row>
      <QRContainer ref={QRCodeContainerRef}>
        {tables.map((table) => (
          <QRCodeCanvas
            key={table.tableHash}
            value={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${table.tableNumber}&tableHash=${table.tableHash}`}
            size={150}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
          />
        ))}
      </QRContainer>
    </SettingSection>
  );
}

export default TableQRDownload;
