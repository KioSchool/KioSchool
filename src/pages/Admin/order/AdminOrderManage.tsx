import React, { useEffect } from 'react';
import AppContainer from '@components/common/container/AppContainer';
import AppButton from '@components/common/button/AppButton';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import AppLabel from '@components/common/label/AppLabel';
import { QRCodeCanvas } from 'qrcode.react';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { colFlex, rowFlex } from '@styles/flexStyles';

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

const PreviewContainer = styled.iframe`
  width: 100%;
  height: 100%;
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

const QRCodeCard = styled.div`
  gap: 10px;
  width: 200px;
  height: 230px;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  ${colFlex({ align: 'center' })}
`;

const TableLink = styled.a`
  font-weight: bold;
  color: white;
  padding: 5px 10px;
  background: #eb6d09;
  border-radius: 10px;
`;

const QRCodeDownloadButton = styled.label`
  width: 100px;
  height: 30px;
  border: 1px solid #eb6d09;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ButtonContainer = styled.div`
  gap: 20px;
  ${rowFlex()}
`;

function AdminOrderManage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [tableCount, setTableCount] = React.useState(1);
  const baseUrl = `${location.protocol}//${location.host}`;

  const handleTableCount = (count: number) => {
    setTableCount(count);
    localStorage.setItem(`workspace-${workspaceId}-tableCount`, count.toString());
  };

  const downloadQrCode = (tableNo: number) => {
    const canvas = document.getElementById(`qrcode-${tableNo}`) as HTMLCanvasElement;
    const link = document.createElement('a');
    link.download = `${tableNo}번 테이블 QR코드.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    setTableCount(Number(localStorage.getItem(`workspace-${workspaceId}-tableCount`)) || 1);
  }, []);

  const titleNavBarChildren = (
    <ButtonContainer className={'button-container'}>
      <AppButton
        onClick={() => {
          handleTableCount(tableCount + 1);
        }}
      >
        테이블 추가
      </AppButton>
      <AppButton
        onClick={() => {
          handleTableCount(tableCount - 1);
        }}
        disabled={tableCount === 1}
      >
        테이블 삭제
      </AppButton>
    </ButtonContainer>
  );

  return (
    <AppContainer
      contentsJustify={'center'}
      useNavBackground={true}
      contentsDirection={'row'}
      useScroll={true}
      useTitleNavBar={{ title: '주문 페이지 관리', children: titleNavBarChildren }}
    >
      <Container className={'admin-order-manage-container'}>
        <AppLabel>테이블 개수는 {tableCount}개 입니다.</AppLabel>
        <ContentContainer className={'content-container'}>
          <DeviceFrameset device="iPhone X" width={360} height={700}>
            <PreviewContainer src={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=1&preview=true`} />
          </DeviceFrameset>
          <QRCodeContainer className={'qrcode-container'}>
            {Array.from({ length: tableCount }, (_, index) => (
              <QRCodeCard key={index} className={'qrcode-card'}>
                <TableLink href={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`} target={'_blank'}>
                  {index + 1}번 테이블
                </TableLink>
                <QRCodeCanvas value={`${baseUrl}/order?workspaceId=${workspaceId}&tableNo=${index + 1}`} size={150} id={`qrcode-${index + 1}`} />
                <QRCodeDownloadButton
                  onClick={() => {
                    downloadQrCode(index + 1);
                  }}
                >
                  다운로드
                </QRCodeDownloadButton>
              </QRCodeCard>
            ))}
          </QRCodeContainer>
        </ContentContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminOrderManage;
