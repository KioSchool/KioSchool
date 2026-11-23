import styled from '@emotion/styled';
import { INFO_SECTION_ID } from '@constants/data/landingContent';
import ProductVideo from '@components/user/landing/ProductVideo';
import RevealOnScroll from '@components/user/landing/RevealOnScroll';
import SectionHeading from '@components/user/landing/SectionHeading';
import liveFlowPoster from '@resources/image/landing/live-flow-poster.webp';
import payUndoToast from '@resources/image/landing/pay-undo-toast.webp';
import productSummary from '@resources/image/landing/product-summary.webp';
import liveFlowVideo from '@resources/video/live-flow.mp4';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner, LandingSection, landingFrameStyle } from '@styles/landingStyles';
import DetailCard from './DetailCard';
import SharedDevicesIllustration from './SharedDevicesIllustration';

const LIVE_FLOW_RATIO = 1180 / 690;

const VideoArea = styled.div`
  margin-top: 64px;

  ${mobileMediaQuery} {
    margin-top: 40px;
  }
`;

const Cards = styled.div`
  margin-top: 24px;
  gap: 24px;
  ${rowFlex({ align: 'stretch' })}

  ${mobileMediaQuery} {
    gap: 16px;
    ${colFlex({ align: 'stretch' })}
  }
`;

const UndoToastImage = styled.img`
  ${landingFrameStyle}
  width: 322px;
  max-width: 90%;
  display: block;
  border-radius: 10px;
`;

const ProductSummaryImage = styled.img`
  width: 228px;
  display: block;
  border-radius: 10px;

  ${mobileMediaQuery} {
    width: 164px;
  }
`;

function InfoOrderProcessSection() {
  return (
    <LandingSection id={INFO_SECTION_ID.PROCESS} tone="grey">
      <LandingInner>
        <SectionHeading
          eyebrow="주문 처리"
          titleLines={['들어온 주문은', '한 화면에서 끝까지 처리해요']}
          lead="주문은 주문 완료, 결제 완료, 서빙 완료 순서로 상태가 바뀝니다. 손님이 주문하면 운영진 화면에 바로 반영됩니다."
        />
        <VideoArea>
          <RevealOnScroll offsetY={24} delay={0.1}>
            <ProductVideo src={liveFlowVideo} poster={liveFlowPoster} label="손님 주문이 운영진 화면에 바로 들어오는 장면" ratio={LIVE_FLOW_RATIO} />
          </RevealOnScroll>
        </VideoArea>
        <Cards>
          <DetailCard
            order={0}
            title="결제 확인은 체크 한 번"
            description="입금자명을 확인하고 체크를 누르면 결제 완료로 처리됩니다. 잘못 눌렀을 때는 바로 되돌릴 수 있습니다."
          >
            <UndoToastImage src={payUndoToast} alt="결제 확인 되돌리기 알림" loading="lazy" />
          </DetailCard>
          <DetailCard order={1} title="주방은 상품별 주문량으로" description="메뉴별로 준비해야 할 수량과 테이블별 대기 시간을 보여 줍니다.">
            <ProductSummaryImage src={productSummary} alt="실시간 상품별 주문량" loading="lazy" />
          </DetailCard>
          <DetailCard
            order={2}
            title="카운터와 주방에서 함께"
            description="한 계정으로 노트북, PC, 태블릿 여러 대에서 접속하면 모든 화면에 주문이 함께 반영됩니다."
          >
            <SharedDevicesIllustration />
          </DetailCard>
        </Cards>
      </LandingInner>
    </LandingSection>
  );
}

export default InfoOrderProcessSection;
