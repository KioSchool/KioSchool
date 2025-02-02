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
import { toPng } from 'html-to-image';
import PreviewContainer from '@components/common/container/PreviewContainer';

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

const PreviewContent = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const QRCodeContainer = styled.div`
  display: grid;
  width: 700px;
  height: 700px;
  overflow: auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
`;

const QRCodeCardContainer = styled.div`
  gap: 10px;
  width: 200px;
  height: 230px;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  ${colFlex({ align: 'center' })}
`;

const QRCodeCard = styled.div`
  background: ${Color.WHITE};
  gap: 10px;
  width: 200px;
  height: 230px;
  border-radius: 20px;
  ${colFlex({ align: 'center' })}
`;

const TableLink = styled.a`
  font-weight: bold;
  color: ${Color.WHITE};
  padding: 5px 10px;
  background: ${Color.KIO_ORANGE};
  border-radius: 10px;
`;

const QRCodeDownloadButton = styled.label`
  width: 100px;
  height: 30px;
  border: 1px solid ${Color.KIO_ORANGE};
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function AdminTableCount() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace, updateWorkspaceTableCount } = useAdminWorkspace();
  const setAdminWorkspace = useSetRecoilState(adminWorkspaceAtom);
  const workspace = useRecoilValue(adminWorkspaceAtom);
  const QRCodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>([]);

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
        children: <AdminTableCountTitleNavBarChildren handleTableCount={handleTableCount} tableCount={workspace.tableCount} />,
      }}
    >
      <Container className={'admin-order-manage-container'}>
        <AppLabel>테이블 개수는 {workspace.tableCount}개 입니다.</AppLabel>
        <ContentContainer className={'content-container'}>
          <PreviewContainer>
            <PreviewContent src={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=1&preview=true`} />
          </PreviewContainer>
          <QRCodeContainer className={'qrcode-container'}>
            {Array.from({ length: workspace.tableCount }, (_, index) => (
              <QRCodeCardContainer key={index}>
                <QRCodeCard className={'qrcode-card'} ref={(el) => (QRCodeRefs.current[index + 1] = el)}>
                  <TableLink href={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`} target={'_blank'}>
                    {index + 1}번 테이블
                  </TableLink>
                  <QRCodeCanvas value={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`} size={150} />
                </QRCodeCard>
                <QRCodeDownloadButton onClick={() => downloadQrCode(index + 1)}>다운로드</QRCodeDownloadButton>
              </QRCodeCardContainer>
            ))}
          </QRCodeContainer>
        </ContentContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminTableCount;
