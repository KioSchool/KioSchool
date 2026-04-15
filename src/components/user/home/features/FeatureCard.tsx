import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import FeatureIcon, { FeatureIconType } from './FeatureIcon';
import FeaturePreview from './FeaturePreview';

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

interface FeatureCardProps {
  title: string;
  description: string;
  iconType: FeatureIconType;
  delay: number;
}

function FeatureCard({ title, description, iconType, delay }: FeatureCardProps) {
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
      <FeaturePreview iconType={iconType} label={title} />
    </Card>
  );
}

export default FeatureCard;
