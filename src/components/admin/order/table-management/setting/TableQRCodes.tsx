import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import QRCode from 'qrcode';
import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getQRCodeCanvases, calculateGridMetrics, createOutputCanvas, initCanvasContext, drawQRTiles, triggerDownload } from '@utils/qrCode';

const Container = styled.div`
  width: 100%;
  height: 150px;
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
  font-weight: 400;
  border-bottom: 1px solid #ececec;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  align-items: center;
`;

const HeaderSection = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const HeaderDivider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ececec;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  align-items: center;
`;

const Section = styled.div`
  gap: 10px;
  padding: 20px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background-color: #ececec;
`;

const QRContainer = styled.div`
  display: none;
`;

function TableQRCodes() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspace = useAtomValue(adminWorkspaceAtom);
  const QRCodeContainerRef = useRef<HTMLDivElement>(null);
  const baseUrl = location.origin;

  const downloadAllQrCode = () => {
    const container = QRCodeContainerRef.current;
    if (!container || !workspace) {
      return alert('다운로드 오류가 발생했습니다!');
    }

    const qrCanvases = getQRCodeCanvases(container);
    if (!qrCanvases.length) {
      return alert('QR 코드가 없습니다!');
    }

    const scale = 3;
    const metrics = calculateGridMetrics(qrCanvases.length);
    const outputCanvas = createOutputCanvas(metrics.canvasWidth * scale, metrics.canvasHeight * scale);
    const ctx = outputCanvas.getContext('2d')!;

    ctx.scale(scale, scale);

    initCanvasContext(ctx, metrics.canvasWidth, metrics.canvasHeight);
    drawQRTiles(ctx, qrCanvases, metrics);
    triggerDownload(outputCanvas, `${workspace.name}-모든-QR코드.png`);
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
    <Container>
      <Header>
        <HeaderSection>테이블 전체 QR</HeaderSection>
        <HeaderDivider />
        <HeaderSection>미리보기 QR</HeaderSection>
      </Header>
      <Content>
        <Section>
          <RoundedAppButton onClick={downloadAllQrCode}>전체 다운로드</RoundedAppButton>
        </Section>
        <Divider />
        <Section>
          <RoundedAppButton onClick={downloadPreviewQrCode}>미리보기 다운로드</RoundedAppButton>
        </Section>
      </Content>

      <QRContainer ref={QRCodeContainerRef}>
        {workspace &&
          Array.from({ length: workspace.tableCount }, (_, index) => (
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
    </Container>
  );
}

export default TableQRCodes;
