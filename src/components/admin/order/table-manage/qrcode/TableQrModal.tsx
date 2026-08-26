import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { QRCodeCanvas } from 'qrcode.react';
import QRCode from 'qrcode';
import { RiCloseLine, RiExternalLinkLine, RiImageLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { Table } from '@@types/index';
import { downloadDataUrl } from '@utils/qrCode';

const QR_DISPLAY_SIZE_PX = 220;
const QR_DOWNLOAD_SIZE_PX = 480;
const QR_DOWNLOAD_MARGIN = 5;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(70, 74, 77, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2000;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Modal = styled.div`
  width: 340px;
  max-width: 92vw;
  box-sizing: border-box;
  background-color: ${Color.WHITE};
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 12px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  padding: 20px;
  gap: 16px;
  z-index: 2001;
  ${colFlex({ align: 'center' })};
`;

const Header = styled.div`
  width: 100%;
  position: relative;
  ${colFlex({ align: 'center' })};
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${Color.BLACK};
`;
const Subtitle = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -4px;
  right: -4px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${Color.GREY};
  padding: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    color: ${Color.BLACK};
  }
`;

const QrWrapper = styled.div`
  padding: 16px;
  border: 1px solid #ececec;
  border-radius: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const ActionColumn = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()};
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: none;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  gap: 6px;
  background-color: ${({ primary }) => (primary ? Color.KIO_ORANGE : '#e8eef2')};
  color: ${({ primary }) => (primary ? Color.WHITE : '#464a4d')};
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background-color: ${({ primary }) => (primary ? '#ffaf70' : '#d9e3e8')};
  }
`;

const UrlText = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: ${Color.LIGHT_GREY};
  border-radius: 8px;
  font-size: 11px;
  line-height: 1.5;
  word-break: break-all;
  color: ${Color.GREY};
`;

const UrlValue = styled.span`
  color: ${Color.KIO_ORANGE};
  font-weight: 600;
`;

interface TableQrModalProps {
  workspaceId: string | undefined;
  workspaceName: string;
  table: Table;
  onClose: () => void;
}

function TableQrModal({ workspaceId, workspaceName, table, onClose }: TableQrModalProps) {
  const orderPageUrl = `${location.origin}/order?workspaceId=${workspaceId}&tableNo=${table.tableNumber}&tableHash=${table.tableHash}`;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOpenOrderPage = () => {
    window.open(orderPageUrl, '_blank');
  };

  const handleDownloadImage = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(orderPageUrl, {
        width: QR_DOWNLOAD_SIZE_PX,
        errorCorrectionLevel: 'H',
        margin: QR_DOWNLOAD_MARGIN,
      });
      downloadDataUrl(dataUrl, `테이블${table.tableNumber} QR코드.png`);
    } catch (error) {
      console.error(error);
      alert('QR 코드 생성에 실패했습니다.');
    }
  };

  const modalNode = (
    <Overlay onClick={onClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose} type="button">
            <RiCloseLine size={18} />
          </CloseButton>
          <Title>{table.tableNumber}번 테이블</Title>
          <Subtitle>{workspaceName}</Subtitle>
        </Header>
        <QrWrapper>
          <QRCodeCanvas value={orderPageUrl} size={QR_DISPLAY_SIZE_PX} bgColor="#ffffff" fgColor="#000000" level="H" />
        </QrWrapper>
        <ActionColumn>
          <ActionButton type="button" primary onClick={handleOpenOrderPage}>
            <RiExternalLinkLine size={16} />
            주문 화면 열기
          </ActionButton>
          <ActionButton type="button" onClick={handleDownloadImage}>
            <RiImageLine size={16} />
            이미지 저장
          </ActionButton>
        </ActionColumn>
        <UrlText>
          {location.origin}/order?workspaceId=<UrlValue>{workspaceId}</UrlValue>&tableNo=<UrlValue>{table.tableNumber}</UrlValue>&tableHash=
          <UrlValue>{table.tableHash}</UrlValue>
        </UrlText>
      </Modal>
    </Overlay>
  );

  const modalRoot = document.getElementById(MODAL_ROOT_KEY);
  return modalRoot ? createPortal(modalNode, modalRoot) : modalNode;
}

export default TableQrModal;
