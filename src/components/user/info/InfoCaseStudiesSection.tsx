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
    label: '하우스파티',
    title: '피크 타임에도 안정적인 운영',
    quote: '예상보다 손님이 훨씬 많아 밀렸을 때, 키오스쿨 덕분에 운영이 가능했어요. 주문 실수도 확실히 줄었습니다.',
    metrics: [
      { value: '만족도 5점', label: '만점' },
      { value: 'PC + 태블릿', label: '사용 기기' },
    ],
  },
  {
    label: '건국대학교 생명과학대학',
    title: '분리된 장소에서 동시 현황 확인',
    quote: '카운터와 주방이 떨어져 있어도 동시에 주문 현황을 확인할 수 있었어요. 인력 업무가 확실히 줄었습니다.',
    metrics: [
      { value: '만족도 5점', label: '만점' },
      { value: '인력 감소', label: '가장 큰 변화' },
    ],
  },
  {
    label: '사회환경공학부 학생회',
    title: '테이블 28 개에서 45 개로 규모 확대',
    quote: '돈 관리와 주문 관리가 동시에 개선됐어요. 키오스쿨 덕분에 테이블을 28 개에서 45 개로 늘릴 수 있었습니다.',
    metrics: [
      { value: '45개', label: '테이블' },
      { value: '160%', label: '규모 확대' },
    ],
  },
  {
    label: '컴퓨터공학부 학생회',
    title: '홀-주방 소통 원활, 인력 감소',
    quote: '홀과 주방 소통이 원활해지고, 카운터와 홀 인력이 많이 줄었어요. 상품별 판매량으로 재고 파악도 쉬웠습니다.',
    metrics: [
      { value: '만족도 5점', label: '만점' },
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
