import React, { useEffect, useRef, useState } from 'react';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import AppLabel from '@components/common/label/AppLabel';
import { QRCodeCanvas } from 'qrcode.react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AdminTableCountTitleNavBarChildren from '@components/admin/order/AdminOrderManageTitleNavBarChildren';
import { Color } from '@resources/colors';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { adminWorkspaceAtom } from '@recoils/atoms';
import PreviewContainer from '@components/common/container/PreviewContainer';
import { isDesktop } from 'react-device-detect';
import { tabletMediaQuery } from '@styles/globalStyles';
import { toPng } from 'html-to-image';

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
  const { fetchWorkspace, updateWorkspaceTableCount } = useAdminWorkspace();
  const setAdminWorkspace = useSetRecoilState(adminWorkspaceAtom);
  const workspace = useRecoilValue(adminWorkspaceAtom);
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
    const qrContainer = QRCodeContainerRef.current;
    if (!qrContainer) {
      return alert('다운로드 오류가 발생했습니다!');
    }

    const qrCanvasElements = Array.from(qrContainer.querySelectorAll<HTMLCanvasElement>('canvas'));
    if (!qrCanvasElements.length) {
      return alert('QR 코드가 없습니다!');
    }

    const qrImageSize = 150;
    const gridSpacing = 20;
    const columnsCount = 4;
    const labelSquareSize = 35;
    const cellStep = qrImageSize + gridSpacing;
    const rowsCount = Math.ceil(qrCanvasElements.length / columnsCount);
    const canvasWidth = columnsCount * qrImageSize + (columnsCount - 1) * gridSpacing;
    const canvasHeight = rowsCount * qrImageSize + (rowsCount - 1) * gridSpacing;

    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvasWidth;
    outputCanvas.height = canvasHeight;
    const ctx = outputCanvas.getContext('2d')!;

    ctx.fillStyle = Color.WHITE;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 20px sans-serif';

    qrCanvasElements.forEach((qrCanvas, idx) => {
      const colIndex = idx % columnsCount;
      const rowIndex = Math.floor(idx / columnsCount);
      const posX = colIndex * cellStep;
      const posY = rowIndex * cellStep;

      ctx.drawImage(qrCanvas, posX, posY, qrImageSize, qrImageSize);

      const labelX = posX + qrImageSize - labelSquareSize;
      const labelY = posY + qrImageSize - labelSquareSize;
      ctx.fillStyle = Color.KIO_ORANGE;
      ctx.fillRect(labelX, labelY, labelSquareSize, labelSquareSize);

      ctx.fillStyle = Color.WHITE;
      ctx.fillText(`${idx + 1}`, labelX + labelSquareSize / 2, labelY + labelSquareSize / 2);
    });

    outputCanvas.toBlob((blob) => {
      if (!blob) {
        return alert('이미지 생성 실패');
      }

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${workspace.name}-모든-QR코드.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    });
  };

  const downloadQrCode = (tableNo: number) => {
    const qrCode = QRCodeRefs.current[tableNo];
    if (!qrCode) {
      alert('다운로드 오류가 발생했습니다!');
      return;
    }

    toPng(qrCode, {
      skipFonts: true,
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${tableNo}번 테이블 QR코드.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
        alert('QR 코드 다운로드에 실패했습니다.');
      });
  };

  useEffect(() => {
    // will be deleted
    localStorage.removeItem(`workspace-${workspaceId}-tableCount`);
    fetchWorkspace(workspaceId);
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
