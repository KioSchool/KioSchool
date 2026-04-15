import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { bodyTypography, eyebrowTypography, headingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  padding: 120px 24px;
  background: #f8f9fa;
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 80px 20px;
  }
`;

const SectionLabel = styled.span`
  margin-bottom: 8px;
  ${eyebrowTypography};
`;

const SectionTitle = styled.h2`
  text-align: center;
  ${headingTypography};
`;

const Timeline = styled.div`
  max-width: 520px;
  width: 100%;
  margin-top: 56px;
  ${colFlex({})};
`;

const TimelineItem = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'stretch' })};
`;

const NodeColumn = styled.div`
  flex-shrink: 0;
  ${colFlex({ align: 'center' })};
`;

const NumberCircle = styled.div<{ isLast: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ isLast }) => (isLast ? Color.KIO_ORANGE : Color.WHITE)};
  border: 2px solid ${({ isLast }) => (isLast ? Color.KIO_ORANGE : '#e5e8eb')};
  color: ${({ isLast }) => (isLast ? Color.WHITE : '#3C3530')};
  font-size: 16px;
  font-weight: 800;
  flex-shrink: 0;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Connector = styled.div`
  width: 2px;
  flex: 1;
  min-height: 40px;
  background: #e5e8eb;
`;

const StepContent = styled.div`
  padding-bottom: 32px;
  ${colFlex({})};
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #3c3530;
  letter-spacing: -0.02em;
`;

const StepDescription = styled.p`
  margin-top: 4px;
  ${bodyTypography};
`;

const STEPS = [
  {
    number: 1,
    title: '회원가입',
    description: '학교 이메일 하나면 충분합니다. 1분이면 가입이 완료됩니다.',
  },
  {
    number: 2,
    title: '주점 개설',
    description: '주점 운영 공간을 간편하게 만드세요. 주점 이름만 정하면 바로 생성됩니다.',
  },
  {
    number: 3,
    title: '메뉴 및 테이블 등록',
    description: '메뉴와 가격을 등록하고, 테이블 수를 입력하면 QR 코드가 자동으로 만들어집니다.',
  },
  {
    number: 4,
    title: '축제 시작',
    description: 'QR 코드를 테이블에 붙이면 준비 끝. 스캔하면 주문이 바로 들어옵니다.',
  },
];

function InfoHowToUseSection() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        <SectionLabel>HOW TO USE</SectionLabel>
        <SectionTitle>이렇게 시작하세요</SectionTitle>
      </motion.div>
      <Timeline>
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
          >
            <TimelineItem>
              <NodeColumn>
                <NumberCircle isLast={index === STEPS.length - 1}>{step.number}</NumberCircle>
                {index < STEPS.length - 1 && <Connector />}
              </NodeColumn>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </TimelineItem>
          </motion.div>
        ))}
      </Timeline>
    </Container>
  );
}

export default InfoHowToUseSection;
