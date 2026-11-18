import { INFO_SECTION_ID } from '@constants/data/landingContent';
import statistics from '@resources/image/landing/statistics.webp';
import InfoScreenSection from './InfoScreenSection';

const STATISTICS_RATIO = 2320 / 1295;

const SETTLEMENT_POINTS = [
  { title: '결제수단별 합계', description: '토스, 카카오페이, 계좌이체별 주문 건수를 나눠 보여 줍니다.' },
  { title: '지난 주문 찾기', description: '전체 주문에서 주문번호나 주문자 이름으로 지난 주문을 검색할 수 있습니다.' },
  { title: '테이블별 이용 기록', description: '주문 타임라인에서 테이블별 이용 시작 시각과 이용 시간을 확인할 수 있습니다.' },
];

function InfoSettlementSection() {
  return (
    <InfoScreenSection
      id={INFO_SECTION_ID.SETTLEMENT}
      tone="grey"
      eyebrow="정산과 기록"
      titleLines={['축제가 끝나면', '매출이 정리돼 있어요']}
      lead="오늘 매출과 전일 대비, 시간대별 주문, 메뉴 순위, 결제수단별 합계가 자동으로 집계됩니다."
      image={statistics}
      imageAlt="마감 정산 통계 화면"
      imageRatio={STATISTICS_RATIO}
      points={SETTLEMENT_POINTS}
    />
  );
}

export default InfoSettlementSection;
