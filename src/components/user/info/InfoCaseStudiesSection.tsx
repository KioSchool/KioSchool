import styled from '@emotion/styled';
import SectionHeading from '@components/user/landing/SectionHeading';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection } from '@styles/landingStyles';
import CaseCard from './CaseCard';

const CASES = [
  {
    organization: '하우스파티 운영팀',
    event: '건국대학교 축제',
    title: '피크 타임에도 안정적으로 운영했어요',
    quote: '예상보다 손님이 훨씬 많아 밀렸을 때, 키오스쿨 덕분에 운영이 가능했어요. 주문 실수도 확실히 줄었습니다.',
    metrics: [
      { value: '5점', label: '만족도' },
      { value: 'PC + 태블릿', label: '사용 기기' },
    ],
  },
  {
    organization: '생명과학대학 학생회',
    event: '건국대학교 축제',
    title: '카운터와 주방이 떨어져 있어도',
    quote: '카운터와 주방이 떨어져 있어도 동시에 주문 현황을 확인할 수 있었어요. 인력 업무가 확실히 줄었습니다.',
    metrics: [
      { value: '5점', label: '만족도' },
      { value: '인력 감소', label: '가장 큰 변화' },
    ],
  },
  {
    organization: '사회환경공학부 학생회',
    event: '건국대학교 축제',
    title: '테이블을 28개에서 45개로',
    quote: '돈 관리와 주문 관리가 동시에 개선됐어요. 키오스쿨 덕분에 테이블을 28개에서 45개로 늘릴 수 있었습니다.',
    metrics: [
      { value: '45개', label: '테이블 수' },
      { value: '1.6배', label: '규모' },
    ],
  },
  {
    organization: '컴퓨터공학부 학생회',
    title: '홀과 주방 소통이 원활해졌어요',
    quote: '홀과 주방 소통이 원활해지고, 카운터와 홀 인력이 많이 줄었어요. 상품별 판매량으로 재고 파악도 쉬웠습니다.',
    metrics: [
      { value: '5점', label: '만족도' },
      { value: '3일', label: '운영 기간' },
    ],
  },
];

const Cards = styled.div`
  margin-top: 64px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  ${mobileMediaQuery} {
    margin-top: 40px;
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

function InfoCaseStudiesSection() {
  return (
    <LandingSection tone="grey">
      <LandingInner>
        <SectionHeading eyebrow="사례" titleLines={['먼저 써 본 주점들의 이야기']} />
        <Cards>
          {CASES.map((caseStudy, index) => (
            <CaseCard
              key={caseStudy.organization}
              order={index}
              organization={caseStudy.organization}
              event={caseStudy.event}
              title={caseStudy.title}
              quote={caseStudy.quote}
              metrics={caseStudy.metrics}
            />
          ))}
        </Cards>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoCaseStudiesSection;
