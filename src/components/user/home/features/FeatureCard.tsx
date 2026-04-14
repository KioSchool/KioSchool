import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import FeatureIcon, { FeatureIconType } from './FeatureIcon';

const Card = styled(motion.div)`
  background: ${Color.WHITE};
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  padding: 36px;
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  overflow: hidden;
  ${colFlex({ align: 'flex-start' })};

  @media (hover: hover) {
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
    }
  }

  ${mobileMediaQuery} {
    padding: 28px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #3c3530;
  letter-spacing: -0.02em;
  margin-top: 20px;
`;

const Description = styled.p`
  font-size: 15px;
  color: #8b95a1;
  letter-spacing: -0.01em;
  margin-top: 8px;
  line-height: 1.65;
`;

const PreviewArea = styled.div`
  width: 100%;
  height: 240px;
  margin-top: 20px;
  border-radius: 16px;
  overflow: hidden;
  background: #f8f9fa;
  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    height: 180px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderText = styled.span`
  font-size: 13px;
  color: #adb1ba;
`;

// TODO 기능 프리뷰 이미지 — 실제 스크린샷으로 교체 필요
const FEATURE_META: Record<FeatureIconType, { image: string; label: string }> = {
  qr: { image: '', label: 'QR 주문 화면' },
  realtime: { image: '', label: '실시간 주문 관리' },
  settlement: { image: '', label: '정산 화면' },
  table: { image: '', label: '테이블 관리' },
};

interface FeatureCardProps {
  title: string;
  description: string;
  iconType: FeatureIconType;
  delay: number;
}

function FeatureCard({ title, description, iconType, delay }: FeatureCardProps) {
  const { image, label } = FEATURE_META[iconType];

  return (
    <Card
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      <FeatureIcon iconType={iconType} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <PreviewArea>{image ? <PreviewImage src={image} alt={label} /> : <PlaceholderText>{label}</PlaceholderText>}</PreviewArea>
    </Card>
  );
}

export default FeatureCard;
