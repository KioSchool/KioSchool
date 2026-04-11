import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
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
  font-size: 13px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE};
  letter-spacing: 0.04em;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: #191f28;
  letter-spacing: -0.02em;
  text-align: center;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

const Timeline = styled.div`
  max-width: 520px;
  width: 100%;
  margin-top: 56px;
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 15px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: #e5e8eb;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 24px;
  position: relative;

  &:not(:last-child) {
    padding-bottom: 40px;
  }
`;

const NumberCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  z-index: 1;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const StepContent = styled.div`
  padding-top: 4px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #191f28;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #6b7684;
  line-height: 1.7;
  margin-top: 6px;
`;

const STEPS = [
  {
    number: 1,
    title: '회원가입',
    description: '이메일 하나면 충분합니다. 1분이면 가입이 완료됩니다.',
  },
  {
    number: 2,
    title: '워크스페이스 개설',
    description: '주점 이름을 정하고 워크스페이스를 만드세요. 주점의 운영 공간이 바로 생성됩니다.',
  },
  {
    number: 3,
    title: '메뉴 및 테이블 등록',
    description: '메뉴와 가격을 등록하고, 테이블 수를 입력하면 QR 코드가 자동으로 만들어집니다.',
  },
  {
    number: 4,
    title: '축제 시작',
    description: 'QR 코드를 테이블에 붙이면 준비 끝. 손님이 스캔하면 주문이 바로 들어옵니다.',
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
        <TimelineLine />
        {STEPS.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
          >
            <TimelineItem>
              <NumberCircle>{step.number}</NumberCircle>
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
