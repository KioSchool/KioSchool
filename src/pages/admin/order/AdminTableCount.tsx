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
import { toPng } from 'html-to-image';
import { isDesktop } from 'react-device-detect';
import { tabletMediaQuery } from '@styles/globalStyles';

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

  const dowloadAllQrCode = () => {
    const qrCodeContainer = QRCodeContainerRef.current;
    if (!qrCodeContainer) {
      alert('다운로드 오류가 발생했습니다!');
      return;
    }

    const originalHeight = qrCodeContainer.style.height;
    qrCodeContainer.style.height = 'auto';

    toPng(qrCodeContainer).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `${workspace.name} QR코드.png`;
      link.href = dataUrl;
      link.click();
      qrCodeContainer.style.height = originalHeight;
    });
  };

  const downloadQrCode = (tableNo: number) => {
    const qrCode = QRCodeRefs.current[tableNo];
    if (!qrCode) {
      alert('다운로드 오류가 발생했습니다!');
      return;
    }

    toPng(qrCode).then((dataUrl) => {
      const link = document.createElement('a');
      link.download = `${tableNo}번 테이블 QR코드.png`;
      link.href = dataUrl;
      link.click();
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
          <AdminTableCountTitleNavBarChildren handleTableCount={handleTableCount} downloadQrCode={dowloadAllQrCode} tableCount={workspace.tableCount} />
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
