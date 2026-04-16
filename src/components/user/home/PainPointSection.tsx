import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { eyebrowTypography, headingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import CountUpNumber from './CountUpNumber';

const Container = styled.div`
  width: 100%;
  padding: 140px 24px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #1a1a2e 0%, #2d2d44 100%);
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 80px 20px;
  }
`;

const SectionLabel = styled.span`
  margin-bottom: 12px;
  ${eyebrowTypography};
`;

const SectionTitle = styled.h2`
  text-align: center;
  ${headingTypography};
  color: ${Color.WHITE};
`;

const HeaderWrapper = styled(motion.div)`
  ${colFlex({ align: 'center' })};
`;

const NumberGrid = styled.div`
  max-width: 900px;
  width: 100%;
  margin-top: 64px;
  gap: 24px;
  ${rowFlex({ justify: 'center' })};

  ${mobileMediaQuery} {
    margin-top: 48px;
    gap: 40px;
    ${colFlex({ align: 'center' })};
  }
`;

const NumberMotionWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
`;

const NumberItem = styled.div`
  flex: 1;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const NumberLabel = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
  text-align: center;
  line-height: 1.5;
`;

const SourceNote = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 48px;
  text-align: center;
`;

const PAIN_CARDS = [
  { value: 5, suffix: ' 명+', label: '수기 운영 시 필요한 추가 인력' },
  { value: 2, suffix: ' h+', label: '수기 정산 소요 시간' },
  { value: 10, suffix: ' 건+', label: '하루 평균 주문 누락' },
];

function PainPointSection() {
  return (
    <Container>
      <HeaderWrapper
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <SectionLabel>PROBLEM</SectionLabel>
        <SectionTitle>축제 운영, 아직도 이렇게 하고 계신가요?</SectionTitle>
      </HeaderWrapper>
      <NumberGrid>
        {PAIN_CARDS.map((card, index) => (
          <NumberMotionWrapper
            key={card.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
          >
            <NumberItem>
              <CountUpNumber value={card.value} suffix={card.suffix} label="" size="large" numberColor="rgba(255, 255, 255, 0.95)" />
              <NumberLabel>{card.label}</NumberLabel>
            </NumberItem>
          </NumberMotionWrapper>
        ))}
      </NumberGrid>
      <SourceNote>키오스쿨 사용자 인터뷰 기반</SourceNote>
    </Container>
  );
}

export default PainPointSection;
