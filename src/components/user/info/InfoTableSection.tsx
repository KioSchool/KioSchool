import { INFO_SECTION_ID } from '@constants/data/landingContent';
import tableListPanel from '@resources/image/landing/table-list-panel.webp';
import InfoScreenSection from './InfoScreenSection';

const TABLE_LIST_PANEL_RATIO = 2320 / 1340;

const TABLE_POINTS = [
  { title: 'QR은 자동으로', description: '테이블 수만 입력하면 테이블별 QR 코드가 자동으로 생성됩니다. 이미지로 저장해 출력할 수 있습니다.' },
  { title: '주의·초과 따로 보기', description: '종료가 가까운 테이블은 주의, 이용 시간을 넘긴 테이블은 초과로 모아 볼 수 있습니다.' },
  { title: '연장과 사용 종료', description: '이용 시간을 연장하거나 사용을 종료할 수 있습니다. 종료하면 다음 손님이 바로 이용할 수 있습니다.' },
];

function InfoTableSection() {
  return (
    <InfoScreenSection
      id={INFO_SECTION_ID.TABLE}
      tone="white"
      eyebrow="테이블"
      titleLines={['테이블마다 남은 시간을', '보고 바로 연장해요']}
      lead="사용 시작을 누르면 테이블마다 남은 이용 시간이 표시됩니다."
      image={tableListPanel}
      imageAlt="테이블 목록과 남은 시간, 연장 패널"
      imageRatio={TABLE_LIST_PANEL_RATIO}
      points={TABLE_POINTS}
    />
  );
}

export default InfoTableSection;
