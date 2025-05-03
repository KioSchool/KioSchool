import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import CellularConnectionSvg from '@resources/svg/preview/CellularConnectionSvg';
import { RiBatteryFill, RiExternalLinkLine, RiWifiFill, RiQrCodeLine } from '@remixicon/react';
import AppLabel from '@components/common/label/AppLabel';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import * as ReactDOM from 'react-dom/client';
import { flushSync } from 'react-dom';

const Container = styled.div<{ width: number; height: number }>`
  ${colFlex({ justify: 'center', align: 'center' })}
  width: ${(props) => props.width}px;
  height: ${(props) => props.height + 30}px;
  gap: 25px;
`;

const DeviceContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding-top: 20px;
  border-radius: 28px;
  box-shadow: 1px 10px 40px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const IndicatorContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
`;

const LeftIndicatorContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 3px;
`;

const RightIndicatorContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 3px;
`;

const BatteryIcon = styled(RiBatteryFill)`
  width: 16px;
  height: 15px;
`;

const WifiIcon = styled(RiWifiFill)`
  width: 15px;
  height: 15px;
`;

const LinkIcon = styled(RiExternalLinkLine)`
  width: 15px;
  height: 15px;
`;

const QRCodeIcon = styled(RiQrCodeLine)`
  width: 15px;
  height: 15px;
`;

const FooterContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 30px;
  font-size: 15px;
  color: ${Color.GREY};
  gap: 15px;
`;

const PreviewContent = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const LinkContainer = styled.div`
  max-width: 350px;
  ${rowFlex({ justify: 'center', align: 'center' })}
  cursor: pointer;
  gap: 3px;
  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

interface PreviewContainerProps {
  width?: number;
  height?: number;
}

function PreviewContainer({ width = 360, height = 700 }: PreviewContainerProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const baseUrl = location.origin;
  const previewUrl = `${baseUrl}/order?workspaceId=${workspaceId}&tableNo=1&preview=true`;

  const onClickPreviewLink = () => {
    window.open(previewUrl, '_blank');
  };

  const onClickDownloadQRCode = () => {
    const imageDiv = document.createElement('div');
    Object.assign(imageDiv.style, {
      position: 'absolute',
      left: '-9999px',
      background: 'white',
      padding: '10px',
      borderRadius: '10px',
    });

    document.body.appendChild(imageDiv);

    const root = ReactDOM.createRoot(imageDiv);

    flushSync(() => {
      root.render(<QRCodeCanvas value={previewUrl} size={200} level="H" bgColor="#FFFFFF" fgColor="#000000" />);
    });

    try {
      const canvasElement = imageDiv.querySelector('canvas');

      if (!canvasElement) {
        throw new Error('QR 코드 캔버스 요소를 찾을 수 없습니다.');
      }

      const dataUrl = canvasElement.toDataURL();

      const link = document.createElement('a');
      link.download = '미리보기_QR코드.png';
      link.href = dataUrl;
      link.click();

      root.unmount();
      document.body.removeChild(imageDiv);
    } catch (error) {
      console.error('QR 코드 처리 중 오류가 발생했습니다:', error);
      alert('QR 코드 다운로드 중 오류가 발생했습니다!');

      if (root) {
        root.unmount();
      }

      if (document.body.contains(imageDiv)) {
        document.body.removeChild(imageDiv);
      }
    }
  };

  return (
    <Container width={width} height={height}>
      <DeviceContainer width={width} height={height}>
        <IndicatorContainer>
          <LeftIndicatorContainer>
            <AppLabel size={15} color={Color.BLACK}>
              10:15
            </AppLabel>
          </LeftIndicatorContainer>
          <RightIndicatorContainer>
            <CellularConnectionSvg />
            <WifiIcon />
            <BatteryIcon />
          </RightIndicatorContainer>
        </IndicatorContainer>
        <PreviewContent src={previewUrl} />
      </DeviceContainer>
      <FooterContainer>
        <LinkContainer onClick={onClickPreviewLink}>
          <LinkIcon />
          주문화면 미리보기
        </LinkContainer>
        <LinkContainer onClick={onClickDownloadQRCode}>
          <QRCodeIcon />
          미리보기 QR 다운로드
        </LinkContainer>
      </FooterContainer>
    </Container>
  );
}

export default PreviewContainer;
