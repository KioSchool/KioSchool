import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { RiCloseLine } from '@remixicon/react';

import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  padding: 36px;
  background: rgba(37, 40, 43, 0.58);
  backdrop-filter: blur(3px);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Dialog = styled.div`
  width: min(1160px, calc(100vw - 72px));
  height: min(780px, calc(100vh - 72px));
  overflow: hidden;
  border-radius: 22px;
  background: ${Color.WHITE};
  box-shadow: 0 24px 80px rgba(37, 40, 43, 0.24);
  ${colFlex()}
`;

const Header = styled.header`
  flex-shrink: 0;
  padding: 22px 28px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${Color.TEXT_STRONG};
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${Color.TEXT_STRONG};
  }
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
`;

interface ProductEditorModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function ProductEditorModal({ title, children, onClose }: ProductEditorModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <Backdrop role="presentation">
      <Dialog role="dialog" aria-modal="true" aria-label={title}>
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" aria-label="편집 창 닫기" onClick={onClose}>
            <RiCloseLine size={22} />
          </CloseButton>
        </Header>
        <Content>{children}</Content>
      </Dialog>
    </Backdrop>,
    document.body,
  );
}

export default ProductEditorModal;
