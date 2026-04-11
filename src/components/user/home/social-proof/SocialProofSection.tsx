import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
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
  font-size: 40px;
  font-weight: 700;
  color: #3c3530;
  letter-spacing: -0.03em;
  line-height: 1.35;
  text-align: center;
  margin: 0;

  ${mobileMediaQuery} {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #6b7684;
  letter-spacing: -0.01em;
  text-align: center;
  margin: 12px 0 0;
  line-height: 1.6;

  ${mobileMediaQuery} {
    font-size: 15px;
  }
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

const UNIVERSITIES = ['건국대', '세종대', '홍익대', '경희대', '서울대', '한양대', '성균관대', '중앙대'];

const METRICS = [
  { value: 1200, suffix: '명+', label: '누적 이용자' },
  { value: 15000, suffix: '건+', label: '누적 주문' },
  { value: 30, suffix: '개+', label: '사용 주점' },
  { value: 3000, suffix: '만원+', label: '누적 매출' },
];

const REVIEWS = [
  { name: '건국대 주점 운영자', text: 'QR 코드로 주문하니 직원을 기다릴 필요가 없어 편리했어요.', event: '2025 봄 축제', time: '2주 전' },
  { name: '세종대 축제 참가자', text: '직관적인 인터페이스 덕분에 처음 사용해도 어렵지 않았어요.', event: '2025 봄 축제', time: '3주 전' },
  { name: '홍익대 주점 운영자', text: '주문을 실시간으로 확인할 수 있어 운영이 한결 수월해졌어요.', event: '2024 가을 축제', time: '6개월 전' },
  { name: '경희대 축제 기획단', text: '정산 작업이 10분이면 끝났어요. 예전엔 하루 종일 걸렸는데.', event: '2024 가을 축제', time: '5개월 전' },
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
            <CountUpNumber value={metric.value} suffix={metric.suffix} label={metric.label} />
          </NumberItem>
        ))}
      </NumberGrid>
      <ReviewsGrid>
        {REVIEWS.map((review, index) => (
          <ReviewChat key={review.name} name={review.name} text={review.text} index={index} event={review.event} time={review.time} />
        ))}
      </ReviewsGrid>
    </Container>
  );
}

export default SocialProofSection;
