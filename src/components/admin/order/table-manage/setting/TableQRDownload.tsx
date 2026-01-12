import styled from '@emotion/styled';
import { useRef } from 'react';
import QRCode from 'qrcode';
import { QRCodeCanvas } from 'qrcode.react';
import { downloadQRGrid } from '@utils/qrCode';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #464a4d;
`;

const DownloadButton = styled(NewCommonButton)`
  width: 100%;
  max-width: 250px;
`;

const QRContainer = styled.div`
  display: none;
`;

interface TableQRDownloadProps {
  workspaceId?: string;
  workspaceName: string;
  tableCount: number;
}

function TableQRDownload({ workspaceId, workspaceName, tableCount }: TableQRDownloadProps) {
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
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = '미리보기_QR코드.png';
        link.click();
      })
      .catch((err) => {
        console.error(err);
        alert('QR 코드 생성에 실패했습니다.');
      });
  };

  return (
    <>
      <Container>
        <SectionLabel>전체 QR</SectionLabel>
        <DownloadButton size={'xs'} onClick={downloadAllQrCode}>
          다운로드
        </DownloadButton>

        <SectionLabel>미리보기 QR</SectionLabel>
        <DownloadButton size={'xs'} onClick={downloadPreviewQrCode}>
          다운로드
        </DownloadButton>
      </Container>

      <QRContainer ref={QRCodeContainerRef}>
        {Array.from({ length: tableCount }, (_, index) => (
          <QRCodeCanvas
            key={index}
            value={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`}
            size={150}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
          />
        ))}
      </QRContainer>
    </>
  );
}

export default TableQRDownload;
