import styled from '@emotion/styled';
import ProductShot from '@components/user/landing/ProductShot';
import ProductVideo from '@components/user/landing/ProductVideo';
import liveFlowPoster from '@resources/image/landing/live-flow-poster.webp';
import statistics from '@resources/image/landing/statistics.webp';
import liveFlowVideo from '@resources/video/live-flow.mp4';
import FeatureSection from './FeatureSection';
import QrOrderVisual from './QrOrderVisual';
import TableVisual from './TableVisual';

const LIVE_FLOW_RATIO = 1180 / 690;
const STATISTICS_RATIO = 2320 / 1295;

const Container = styled.div`
  width: 100%;
`;

function FeaturesSection() {
  return (
    <Container>
      <FeatureSection
        eyebrow="QR 주문"
        demoStep={2}
        titleLines={['테이블에서 QR로', '바로 주문해요']}
        description={'손님이 테이블에서 QR을 스캔하면 메뉴를 보고 바로 주문합니다.\n송금은 토스, 카카오페이, 계좌이체 중에서 선택합니다.'}
        layout="row"
        tone="white"
      >
        <QrOrderVisual />
      </FeatureSection>
      <FeatureSection
        eyebrow="실시간 주문 관리"
        demoStep={4}
        titleLines={['들어온 주문을', '한 화면에서 처리해요']}
        description={'주문이 들어오면 운영자 화면에 바로 표시됩니다.\n주문 상태를 실시간으로 관리하고, 놓치는 주문 없이 서빙할 수 있습니다.'}
        layout="column"
        tone="grey"
      >
        <ProductVideo src={liveFlowVideo} poster={liveFlowPoster} label="손님 주문이 운영진 화면에 바로 들어오는 장면" ratio={LIVE_FLOW_RATIO} />
      </FeatureSection>
      <FeatureSection
        eyebrow="테이블 관리"
        demoStep={6}
        titleLines={['테이블마다 남은 시간을', '한눈에 봐요']}
        description={'테이블 수만 입력하면 QR 코드가 자동으로 생성됩니다.\n배치 보기와 목록 보기로 테이블별 남은 시간을 확인하고, 바로 연장할 수 있습니다.'}
        layout="row"
        tone="white"
      >
        <TableVisual />
      </FeatureSection>
      <FeatureSection
        eyebrow="자동 정산"
        demoStep={8}
        titleLines={['축제가 끝나면', '매출이 정리돼 있어요']}
        description={'테이블별, 메뉴별 매출이 자동으로 집계됩니다.\n축제가 끝나면 클릭 한 번으로 정산 결과를 확인할 수 있습니다.'}
        layout="column"
        tone="grey"
      >
        <ProductShot src={statistics} alt="마감 정산 통계 화면" ratio={STATISTICS_RATIO} />
      </FeatureSection>
    </Container>
  );
}

export default FeaturesSection;
