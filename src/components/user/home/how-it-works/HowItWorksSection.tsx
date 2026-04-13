import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { eyebrowTypography, headingTypography, subheadingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import StepIcon from './StepIcon';
import MobileTimeline from './MobileTimeline';

const Container = styled.div`
  width: 100%;
  padding: 140px 24px;
  box-sizing: border-box;
  background: ${Color.WHITE};
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
`;

const Accent = styled.span`
  color: ${Color.KIO_ORANGE};
`;

const SectionSubtitle = styled.p`
  margin-top: 12px;
  text-align: center;
  ${subheadingTypography};
`;

const HeaderWrapper = styled(motion.div)`
  ${colFlex({ align: 'center' })};
`;

const StepsRow = styled.div`
  position: relative;
  max-width: 1080px;
  width: 100%;
  margin-top: 72px;
  ${rowFlex({ justify: 'center', align: 'flex-start' })};

  ${mobileMediaQuery} {
    display: none;
  }
`;

const ConnectorLine = styled.div`
  position: absolute;
  top: 22px;
  left: calc(100% / 6);
  right: calc(100% / 6);
  height: 2px;
  background: #e5e8eb;
`;

const StepMotionWrapper = styled(motion.div)`
  flex: 1;
  display: flex;
`;

const StepColumn = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  ${colFlex({ align: 'center' })};
`;

const NodeCircle = styled.div<{ step: number }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ step }) => (step === 3 ? Color.KIO_ORANGE : Color.WHITE)};
  border: 2px solid ${({ step }) => (step === 3 ? Color.KIO_ORANGE : '#e5e8eb')};
  color: ${({ step }) => (step === 3 ? Color.WHITE : '#3C3530')};
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #3c3530;
  letter-spacing: -0.02em;
  margin-top: 8px;
  text-align: center;
`;

const StepDescription = styled.p`
  font-size: 15px;
  color: #8b95a1;
  letter-spacing: -0.01em;
  line-height: 1.65;
  margin-top: 8px;
  max-width: 260px;
  text-align: center;
`;

const STEPS = [
  {
    number: 1,
    title: '회원가입',
    description: '이메일 하나면 충분해요. 1 분이면 가입이 완료돼요.',
  },
  {
    number: 2,
    title: '주점 설정',
    description: '메뉴와 가격을 등록하고, 테이블 수를 입력하면 QR 코드가 자동으로 만들어져요.',
  },
  {
    number: 3,
    title: '축제 시작',
    description: 'QR 코드를 테이블에 붙이면 준비 끝. 손님이 스캔하면 주문이 바로 들어와요.',
  },
];

function HowItWorksSection() {
  return (
    <Container>
      <HeaderWrapper
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <SectionLabel>HOW IT WORKS</SectionLabel>
        <SectionTitle>
          <Accent>3단계</Accent>면 충분해요
        </SectionTitle>
        <SectionSubtitle>복잡한 준비 과정은 필요 없어요</SectionSubtitle>
      </HeaderWrapper>

      <StepsRow>
        <ConnectorLine />
        {STEPS.map((step, index) => (
          <StepMotionWrapper
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
          >
            <StepColumn>
              <NodeCircle step={step.number}>{step.number}</NodeCircle>
              <StepIcon step={step.number} />
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepColumn>
          </StepMotionWrapper>
        ))}
      </StepsRow>

      <MobileTimeline steps={STEPS} />
    </Container>
  );
}

export default HowItWorksSection;
