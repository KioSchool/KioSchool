import { INFO_SECTION_ID } from '@constants/data/landingContent';
import tableLayout from '@resources/image/landing/table-layout.webp';
import InfoScreenSection from './InfoScreenSection';

const TABLE_LAYOUT_RATIO = 2460 / 1540;

const LAYOUT_POINTS = [
  { title: '배치 편집', description: '테이블을 실제 주점 자리와 같은 모양으로 배치합니다. 자리 구성이 바뀌면 언제든 다시 배치할 수 있습니다.' },
  { title: '자리마다 시간과 주문', description: '테이블마다 남은 시간과 주문 수가 표시되어, 이용 중인 테이블과 빈 테이블을 바로 구분할 수 있습니다.' },
  { title: '누르면 바로 관리', description: '테이블을 선택하면 오른쪽 화면에서 시간 연장, 주문 내역 확인, 사용 종료까지 처리할 수 있습니다.' },
];

function InfoTableLayoutSection() {
  return (
    <InfoScreenSection
      id={INFO_SECTION_ID.LAYOUT}
      tone="grey"
      eyebrow="테이블 배치"
      titleLines={['실제 자리처럼', '테이블을 놓고 봐요']}
      lead="배치 편집에서 테이블을 실제 주점 자리와 같은 모양으로 배치하면, 비어 있는 테이블과 종료가 가까운 테이블을 한눈에 확인할 수 있습니다."
      image={tableLayout}
      imageAlt="테이블 배치 보기 화면"
      imageRatio={TABLE_LAYOUT_RATIO}
      points={LAYOUT_POINTS}
    />
  );
}

export default InfoTableLayoutSection;
