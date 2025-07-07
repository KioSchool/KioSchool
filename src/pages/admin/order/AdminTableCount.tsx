import { useEffect, useRef, useState } from 'react';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import AppLabel from '@components/common/label/AppLabel';
import { QRCodeCanvas } from 'qrcode.react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AdminTableCountTitleNavBarChildren from '@components/admin/table-count/AdminTableCountTitleNavBarChildren';
import { Color } from '@resources/colors';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import PreviewContainer from '@components/common/container/PreviewContainer';
import { isDesktop } from 'react-device-detect';
import { tabletMediaQuery } from '@styles/globalStyles';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import { useAtom } from 'jotai';
import {
  calculateGridMetrics,
  createOutputCanvas,
  drawQRTiles,
  getQRCodeCanvases,
  initCanvasContext,
  triggerDownload,
  QR_IMAGE_SIZE,
  drawQR,
} from '@utils/qrCode';

const Container = styled.div`
  width: 100vw;
  gap: 10px;
  padding-bottom: 50px;
  ${colFlex({ align: 'center' })}
`;

const ContentContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-around' })}
`;

const QRCodeContainer = styled.div`
  display: grid;
  width: 700px;
  height: 700px;
  overflow: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px 20px;

  ${tabletMediaQuery} {
    width: 100%;
    height: 500px;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const QRCodeCard = styled.div`
  ${colFlex({ align: 'center' })}
  background: ${Color.WHITE};
  gap: 10px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  box-sizing: border-box;
`;

const QRCodeImage = styled(QRCodeCanvas)`
  width: 150px;
  height: 150px;
  cursor: pointer;
`;

const TableLink = styled.a`
  font-weight: bold;
  color: ${Color.WHITE};
  padding: 5px 10px;
  background: ${Color.KIO_ORANGE};
  border-radius: 10px;
`;

function AdminTableCount() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { updateWorkspaceTableCount } = useAdminWorkspace();
  const [workspace, setAdminWorkspace] = useAtom(adminWorkspaceAtom);
  const QRCodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>([]);
  const QRCodeContainerRef = useRef<HTMLDivElement | null>(null);

  const [debouncedId, setDebouncedId] = useState<NodeJS.Timeout>();
  const baseUrl = `${location.protocol}//${location.host}`;

  useEffect(() => {
    return () => clearTimeout(debouncedId);
  }, [debouncedId]);

  const handleTableCount = (count: number) => {
    setAdminWorkspace((prev) => ({ ...prev, tableCount: count }));

    const delayDebouncedId = setTimeout(() => {
      updateWorkspaceTableCount(workspaceId, count);
    }, 300);

    setDebouncedId(delayDebouncedId);
  };

  const downloadAllQrCode = () => {
    const container = QRCodeContainerRef.current;
    if (!container) {
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

  const downloadQrCode = (tableNo: number) => {
    const qrCodeElement = QRCodeRefs.current[tableNo];
    if (!qrCodeElement) {
      alert('다운로드 오류가 발생했습니다!');
      return;
    }

    const qrCanvas = qrCodeElement.querySelector('canvas');
    if (!qrCanvas) {
      alert('QR 코드 캔버스를 찾을 수 없습니다.');
      return;
    }

    const scale = 3;
    const outputCanvas = createOutputCanvas(QR_IMAGE_SIZE * scale, QR_IMAGE_SIZE * scale);
    const ctx = outputCanvas.getContext('2d')!;

    ctx.scale(scale, scale);

    initCanvasContext(ctx, QR_IMAGE_SIZE, QR_IMAGE_SIZE);

    drawQR(ctx, qrCanvas, tableNo, 0, 0);

    triggerDownload(outputCanvas, `${tableNo}번 테이블 QR코드.png`);
  };

  useEffect(() => {
    // will be deleted
    localStorage.removeItem(`workspace-${workspaceId}-tableCount`);
  }, []);

  return (
    <AppContainer
      useFlex={rowFlex({ justify: 'center' })}
      useNavBackground={true}
      useScroll={true}
      titleNavBarProps={{
        title: '테이블 개수 관리',
        children: (
          <AdminTableCountTitleNavBarChildren handleTableCount={handleTableCount} downloadQrCode={downloadAllQrCode} tableCount={workspace.tableCount} />
        ),
      }}
    >
      <Container className={'admin-order-manage-container'}>
        <AppLabel>테이블 개수는 {workspace.tableCount}개 입니다.</AppLabel>
        <ContentContainer className={'content-container'}>
          {isDesktop && <PreviewContainer />}
          <QRCodeContainer className={'qrcode-container'} ref={QRCodeContainerRef}>
            {Array.from({ length: workspace.tableCount }, (_, index) => (
              <QRCodeCard key={index} className={'qrcode-card'} ref={(el) => (QRCodeRefs.current[index + 1] = el)}>
                <TableLink href={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`} target={'_blank'}>
                  {index + 1}번 테이블
                </TableLink>
                <QRCodeImage value={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`} onClick={() => downloadQrCode(index + 1)} />
              </QRCodeCard>
            ))}
          </QRCodeContainer>
        </ContentContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminTableCount;
