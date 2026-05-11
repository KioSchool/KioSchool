import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useShareCard from '@hooks/admin/useShareCard';
import DonationSection from './DonationSection';
import { InsightCardResponse } from '@@types/index';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Modal = styled.div`
  width: 380px;
  max-width: 90vw;
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  gap: 14px;
  position: relative;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const Header = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
`;

const ShareRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

const ShareButton = styled.button`
  padding: 10px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 10px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.BLACK};
  border: 1px solid ${Color.GREY};
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const HelperText = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${Color.GREY};
`;

interface Props {
  card: InsightCardResponse;
  onClose: () => void;
}

function ShareSupportModal({ card, onClose }: Props) {
  const { share, download } = useShareCard();

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

  const meta = {
    title: 'KioSchool 어제의 자랑 카드',
    text: card.headline,
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>{card.headline}</Header>
        <div>
          <HelperText style={{ marginBottom: 6 }}>공유</HelperText>
          <ShareRow>
            <ShareButton onClick={() => share(card.imageUrl, meta)}>📤 공유하기</ShareButton>
            <SaveButton onClick={() => download(card.imageUrl)}>📥 이미지 저장</SaveButton>
          </ShareRow>
          <HelperText style={{ marginTop: 6 }}>
            "공유하기"는 OS 시트로 인스타/카톡/메일/저장 등이 한 자리에 뜹니다 (모바일이 가장 풍부).
          </HelperText>
        </div>
        <DonationSection />
      </Modal>
    </Backdrop>
  );
}

export default ShareSupportModal;
