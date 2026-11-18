import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { landingBodyTypography } from '@styles/landingStyles';

const CARD_STAGGER_SECONDS = 0.1;
const HOVER_LIFT = -8;

const Card = styled(motion.div)`
  flex: 1;
  padding: 36px;
  border-radius: 16px;
  background: #ffffff;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 28px 22px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  ${mobileMediaQuery} {
    font-size: 19px;
  }
`;

const Description = styled.p`
  ${landingBodyTypography}
`;

const Visual = styled.div`
  margin-top: 28px;
  height: 280px;
  overflow: hidden;
  border-radius: 12px;
  background: ${LandingColor.SURFACE};
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${mobileMediaQuery} {
    height: 200px;
  }
`;

interface DetailCardProps {
  order: number;
  title: string;
  description: string;
  children: ReactNode;
}

function DetailCard({ order, title, description, children }: DetailCardProps) {
  return (
    <Card
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: HOVER_LIFT }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: order * CARD_STAGGER_SECONDS }}
    >
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Visual>{children}</Visual>
    </Card>
  );
}

export default DetailCard;
