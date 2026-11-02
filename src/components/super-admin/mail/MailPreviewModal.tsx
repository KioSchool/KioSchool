import { useEffect } from 'react';
import styled from '@emotion/styled';
import { RiCloseLine } from '@remixicon/react';
import { MAIL_ADDRESS, MAIL_TEAM_NAME } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Overlay = styled.div`
  z-index: 1011;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Panel = styled.div`
  width: 680px;
  max-width: calc(100% - 32px);
  height: 85vh;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 12px;
  background: ${Color.WHITE};
  gap: 10px;
  ${colFlex()}
`;

const Header = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Title = styled.h2`
  margin: 0;
  color: ${Color.BLACK};
  font-size: 16px;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: none;
  color: ${Color.GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Info = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const Subject = styled.span`
  color: ${Color.BLACK};
  font-size: 14px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Frame = styled.iframe`
  flex: 1;
  width: 100%;
  min-height: 0;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: #f6f7f9;
`;

interface MailPreviewModalProps {
  title: string;
  recipient: string;
  subject: string;
  html: string;
  onClose: () => void;
}

function MailPreviewModal({ title, recipient, subject, html, onClose }: MailPreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <Panel role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" aria-label="닫기" onClick={onClose}>
            <RiCloseLine size={22} />
          </CloseButton>
        </Header>
        <Info>
          보낸 사람: {MAIL_TEAM_NAME} &lt;{MAIL_ADDRESS}&gt;
          <br />
          받는 사람: {recipient}
        </Info>
        <Subject>{subject || '(제목 없음)'}</Subject>
        <Frame title="메일 미리보기" sandbox="" srcDoc={html} />
      </Panel>
    </Overlay>
  );
}

export default MailPreviewModal;
