import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { headingTypography, subheadingTypography } from '@styles/landingTypography';
import { Color } from '@resources/colors';
import CountUpNumber from '@components/user/home/CountUpNumber';
import ReviewChat from './ReviewChat';

const Container = styled.div`
  width: 100%;
  padding: 140px 24px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;
  ${colFlex({ align: 'center' })};

  ${mobileMediaQuery} {
    padding: 80px 24px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin: 0;
  ${headingTypography};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  margin: 12px 0 0;
  ${subheadingTypography};
`;

const UniversityBadgeRow = styled.div`
  max-width: 800px;
  margin-top: 48px;
  margin-bottom: 48px;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const UniversityBadge = styled(motion.span)`
  font-size: 13px;
  font-weight: 500;
  color: #6b6560;
  background: #f2f4f6;
  padding: 6px 14px;
  border-radius: 999px;
`;

const NumberGrid = styled.div`
  width: 100%;
  max-width: 800px;
  gap: 32px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
`;

const NumberItem = styled.div`
  flex: 1;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ReviewsGrid = styled.div`
  width: 100%;
  max-width: 1080px;
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  ${mobileMediaQuery} {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 48px;
  }
`;

const UNIVERSITIES = ['건국대', '세종대', '홍익대', '경희대', '서울대', '한양대', '성균관대', '중앙대', '가천대', '충남대', '제주대'];

function formatKoreanRevenue(latestManwon: number): string {
  const total = Math.max(0, Math.round(latestManwon / 1000) * 1000);
  if (total === 0) return '0';
  const eok = Math.floor(total / 10000);
  const cheonman = Math.floor((total % 10000) / 1000);
  if (eok === 0) return `${cheonman}천만`;
  if (cheonman === 0) return `${eok}억`;
  return `${eok}억 ${cheonman}천만`;
}

const METRICS = [
  { value: 10000, suffix: ' 명+', label: '누적 이용자' },
  { value: 11000, suffix: ' 건+', label: '누적 주문' },
  { value: 40, suffix: ' 개+', label: '사용 주점' },
  { value: 14000, suffix: ' 원+', label: '주점 누적 매출', format: formatKoreanRevenue },
];

const REVIEWS = [
  {
    name: '하우스파티 운영팀',
    text: '예상보다 손님이 훨씬 많아 밀렸을 때, 키오스쿨 덕분에 운영이 가능했어요. 주문 실수도 확실히 줄었습니다.',
    event: '건국대학교 축제',
  },
  {
    name: '생명과학대학 학생회',
    text: '카운터와 주방이 떨어져 있어도 동시에 주문 현황을 확인할 수 있었어요. 인력 업무가 확실히 줄었습니다.',
    event: '건국대학교 축제',
  },
  { name: '사회환경공학부 학생회', text: '돈 관리와 주문 관리가 동시에 개선됐어요. 테이블을 28 개에서 45 개로 늘릴 수 있었습니다.', event: '건국대학교 축제' },
  {
    name: '미래에너지공학과 학생회',
    text: '실시간 주문 조회가 정말 편리했어요. 종이로 관리할 때보다 훨씬 안정적으로 운영할 수 있었습니다.',
    event: '건국대학교 축제',
  },
];

function SocialProofSection() {
  return (
    <Container>
      <SectionTitle>이미 많은 축제에서 사용하고 있어요</SectionTitle>
      <SectionSubtitle>전국 대학교에서 키오스쿨로 축제를 운영하고 있어요</SectionSubtitle>
      <UniversityBadgeRow>
        {UNIVERSITIES.map((name, index) => (
          <UniversityBadge
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
          >
            {name}
          </UniversityBadge>
        ))}
      </UniversityBadgeRow>
      <NumberGrid>
        {METRICS.map((metric) => (
          <NumberItem key={metric.label}>
            <CountUpNumber value={metric.value} suffix={metric.suffix} label={metric.label} format={'format' in metric ? metric.format : undefined} />
          </NumberItem>
        ))}
      </NumberGrid>
      <ReviewsGrid>
        {REVIEWS.map((review, index) => (
          <ReviewChat key={review.name} name={review.name} text={review.text} index={index} event={review.event} />
        ))}
      </ReviewsGrid>
    </Container>
  );
}

export default SocialProofSection;
