import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { eyebrowTypography, headingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  padding: 120px 24px;
  background: ${Color.WHITE};
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

const CardGrid = styled.div`
  max-width: 960px;
  width: 100%;
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  ${mobileMediaQuery} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const CaseCard = styled.div`
  padding: 32px;
  border-radius: 20px;
  background: #f8f9fa;
  ${colFlex({})};

  ${mobileMediaQuery} {
    padding: 24px;
  }
`;

const CaseLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE};
  margin-bottom: 12px;
`;

const CaseTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #191f28;
  letter-spacing: -0.01em;
`;

const CaseQuote = styled.p`
  font-size: 14px;
  color: #6b7684;
  line-height: 1.7;
  margin-top: 12px;
`;

const CaseMetrics = styled.div`
  margin-top: 20px;
  gap: 24px;
  ${rowFlex({})};
`;

const MetricItem = styled.div`
  ${colFlex({})};
`;

const MetricValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
`;

const MetricLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #3c3530;
  margin-top: 4px;
`;

const CASES = [
  {
    label: '건국대학교 2025 축제',
    title: '3일간 1,200건 주문 처리',
    quote: 'QR 코드로 주문하니 직원을 기다릴 필요가 없어 편리했어요. 주문 누락도 없었고요.',
    metrics: [
      { value: '1,200', label: '주문' },
      { value: '12', label: '테이블' },
    ],
  },
  {
    label: '세종대학교 2025 축제',
    title: '정산 시간 90% 단축',
    quote: '정산 작업이 10분이면 끝났어요. 예전엔 하루 종일 걸렸는데.',
    metrics: [
      { value: '90%', label: '시간 절약' },
      { value: '10분', label: '정산 소요' },
    ],
  },
  {
    label: '홍익대학교 2025 축제',
    title: '실시간 주문으로 서빙 실수 제로',
    quote: '주문을 실시간으로 확인할 수 있어 운영이 한결 수월해졌어요.',
    metrics: [
      { value: '0건', label: '서빙 실수' },
      { value: '8', label: '테이블' },
    ],
  },
  {
    label: '경희대학교 2025 축제',
    title: '처음 사용해도 어렵지 않은 UI',
    quote: '직관적인 인터페이스 덕분에 처음 사용해도 어렵지 않았어요.',
    metrics: [
      { value: '800+', label: '이용자' },
      { value: '3일', label: '운영 기간' },
    ],
  },
];

function InfoCaseStudiesSection() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        <SectionLabel>CASE STUDIES</SectionLabel>
        <SectionTitle>실제 사용 사례</SectionTitle>
      </motion.div>
      <CardGrid>
        {CASES.map((caseItem, index) => (
          <motion.div
            key={caseItem.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
          >
            <CaseCard>
              <CaseLabel>{caseItem.label}</CaseLabel>
              <CaseTitle>{caseItem.title}</CaseTitle>
              <CaseQuote>&ldquo;{caseItem.quote}&rdquo;</CaseQuote>
              <CaseMetrics>
                {caseItem.metrics.map((metric) => (
                  <MetricItem key={metric.label}>
                    <MetricValue>{metric.value}</MetricValue>
                    <MetricLabel>{metric.label}</MetricLabel>
                  </MetricItem>
                ))}
              </CaseMetrics>
            </CaseCard>
          </motion.div>
        ))}
      </CardGrid>
    </Container>
  );
}

export default InfoCaseStudiesSection;
