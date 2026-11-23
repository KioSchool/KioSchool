import styled from '@emotion/styled';
import { LANDING_STATS } from '@constants/data/landingContent';
import CountUpValue from '@components/user/landing/CountUpValue';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import { LandingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';
import ReviewCard from './ReviewCard';
import UniversityMarquee from './UniversityMarquee';

const REVIEWS = [
  {
    name: '하우스파티 운영팀',
    event: '건국대학교 축제',
    text: '예상보다 손님이 훨씬 많아 밀렸을 때, 키오스쿨 덕분에 운영이 가능했어요. 주문 실수도 확실히 줄었습니다.',
  },
  {
    name: '생명과학대학 학생회',
    event: '건국대학교 축제',
    text: '카운터와 주방이 떨어져 있어도 동시에 주문 현황을 확인할 수 있었어요. 인력 업무가 확실히 줄었습니다.',
  },
  { name: '사회환경공학부 학생회', event: '건국대학교 축제', text: '돈 관리와 주문 관리가 동시에 개선됐어요. 테이블을 28개에서 45개로 늘릴 수 있었습니다.' },
  {
    name: '미래에너지공학과 학생회',
    event: '건국대학교 축제',
    text: '실시간 주문 조회가 정말 편리했어요. 종이로 관리할 때보다 훨씬 안정적으로 운영할 수 있었습니다.',
  },
];

const Stats = styled.div`
  margin-top: 64px;
  ${rowFlex({ align: 'flex-start' })}

  ${mobileMediaQuery} {
    margin-top: 40px;
    flex-wrap: wrap;
    row-gap: 28px;
  }
`;

const Stat = styled.div`
  flex: 1;
  text-align: center;

  ${mobileMediaQuery} {
    flex: 1 1 50%;
  }
`;

const StatValue = styled.div`
  ${rowFlex({ justify: 'center', align: 'baseline' })}
`;

const REVIEW_STAGGER_SECONDS = 0.1;

const Value = styled(CountUpValue)`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: 32px;
  }
`;

const Unit = styled.span`
  margin-left: 2px;
  font-size: 24px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};

  ${mobileMediaQuery} {
    font-size: 18px;
  }
`;

const StatLabel = styled.p`
  margin: 6px 0 0;
  font-size: 16px;
  color: ${LandingColor.SUB_TEXT};

  ${mobileMediaQuery} {
    font-size: 14px;
  }
`;

const Reviews = styled.div`
  margin-top: 72px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  ${mobileMediaQuery} {
    margin-top: 48px;
    grid-template-columns: 1fr;
    gap: 16px;
    ${colFlex({ align: 'stretch' })}
  }
`;

function SocialProofSection() {
  return (
    <LandingSection tone="white">
      <LandingInner>
        <SectionHeading titleLines={['이미 많은 축제에서 사용하고 있어요']} lead="전국 대학교에서 키오스쿨로 축제를 운영하고 있어요" centered />
        <Stats>
          {LANDING_STATS.map((stat) => (
            <Stat key={stat.label}>
              <StatValue>
                <Value value={stat.value} format={stat.format} />
                <Unit>{stat.unit}</Unit>
              </StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </Stat>
          ))}
        </Stats>
        <UniversityMarquee />
        <Reviews>
          {REVIEWS.map((review, index) => (
            <RevealOnScroll key={review.name} offsetY={20} delay={index * REVIEW_STAGGER_SECONDS}>
              <ReviewCard name={review.name} event={review.event} text={review.text} />
            </RevealOnScroll>
          ))}
        </Reviews>
      </LandingInner>
    </LandingSection>
  );
}

export default SocialProofSection;
