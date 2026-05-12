import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { RiCloseLargeLine, RiShare2Line, RiDownload2Line } from '@remixicon/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import useShareCard from '@hooks/admin/useShareCard';
import { renderInsightCardToDataUrl } from './insightCardRenderer';
import DonationSection from './DonationSection';
import { InsightCardResponse } from '@@types/index';
import { InsightDesignTokens } from './insightDesignTokens';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(70, 74, 77, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2000;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Modal = styled.div`
  width: 380px;
  max-width: 90vw;
  max-height: 90vh;
  background: #fff;
  border: 1px solid ${InsightDesignTokens.card.border};
  border-radius: 12px;
  box-shadow: ${InsightDesignTokens.card.shadow};
  padding: 18px;
  gap: 14px;
  position: relative;
  overflow-y: auto;
  z-index: 2001;
  ${colFlex({ align: 'stretch' })};
`;

const Header = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${InsightDesignTokens.text.primary};
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${InsightDesignTokens.text.muted};
  padding: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    color: ${InsightDesignTokens.text.primary};
  }
`;

const Preview = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background: ${InsightDesignTokens.brand.faint};
  ${rowFlex({ justify: 'center', align: 'center' })};

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const PreviewPlaceholder = styled.div`
  font-size: 11px;
  color: ${InsightDesignTokens.text.muted};
`;

const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 10px;
  background: ${({ primary }) => (primary ? InsightDesignTokens.brand.main : '#F7F7F7')};
  color: ${({ primary }) => (primary ? '#fff' : InsightDesignTokens.text.primary)};
  border: 1px solid ${({ primary }) => (primary ? 'transparent' : InsightDesignTokens.card.border)};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  gap: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  &:hover {
    background: ${({ primary }) => (primary ? InsightDesignTokens.brand.dark : '#eaeaea')};
  }
`;

interface Props {
  card: InsightCardResponse;
  workspaceName: string;
  onClose: () => void;
}

function ShareSupportModal({ card, workspaceName, onClose }: Props) {
  const { share, download } = useShareCard();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    renderInsightCardToDataUrl(card, workspaceName)
      .then((url) => {
        if (!cancelled) setPreviewUrl(url);
      })
      .catch((e) => console.error('preview render error', e));
    return () => {
      cancelled = true;
    };
  }, [card, workspaceName]);

  const meta = {
    title: 'KioSchool 어제의 자랑 카드',
    text: card.headline,
  };

  const modalNode = (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>자랑 카드 공유</Title>
          <CloseButton onClick={onClose}>
            <RiCloseLargeLine size={16} />
          </CloseButton>
        </Header>

        <Preview>
          {previewUrl && <img src={previewUrl} alt="자랑 카드 미리보기" />}
          {!previewUrl && <PreviewPlaceholder>미리보기 생성 중...</PreviewPlaceholder>}
        </Preview>

        <ActionRow>
          <ActionButton primary onClick={() => share(card, workspaceName, meta)}>
            <RiShare2Line size={14} />
            공유하기
          </ActionButton>
          <ActionButton onClick={() => download(card, workspaceName)}>
            <RiDownload2Line size={14} />
            이미지 저장
          </ActionButton>
        </ActionRow>

        <DonationSection />
      </Modal>
    </Overlay>
  );

  const modalRoot = document.getElementById(MODAL_ROOT_KEY);
  return modalRoot ? createPortal(modalNode, modalRoot) : modalNode;
}

export default ShareSupportModal;
