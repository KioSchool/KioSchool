import useEmblaCarousel from 'embla-carousel-react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import dashboardImage from '@resources/image/hero/dashboard.webp';
import phoneImage from '@resources/image/hero/phone.webp';

const Viewport = styled.div`
  width: 100%;
  overflow: visible;

  ${mobileMediaQuery} {
    overflow: hidden;
    padding-bottom: 40px;
    mask-image: linear-gradient(to bottom, black 90%, transparent 100%), linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%), linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%);
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
  }
`;

const MockupArea = styled.div`
  margin-top: 56px;
  z-index: 1;
  gap: 24px;
  ${rowFlex({ justify: 'center', align: 'flex-end' })}

  ${mobileMediaQuery} {
    display: inline-flex;
    gap: 16px;
    margin-top: 40px;
    padding: 0 80px;
    justify-content: flex-start;
  }
`;

const CenterAnchor = styled.div`
  display: none;
  ${mobileMediaQuery} {
    display: block;
    flex: 0 0 0;
  }
`;

const BaseCard = styled.div`
  background: ${Color.WHITE};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  flex: 0 0 auto;
  ${colFlex()}
`;

const PhoneMockup = styled(BaseCard)`
  width: 220px;
  height: 420px;
  border-radius: 32px;

  ${mobileMediaQuery} {
    width: 160px;
    height: 310px;
    border-radius: 24px;
  }
`;

const DashboardMockup = styled(BaseCard)`
  width: 560px;
  height: 420px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  ${mobileMediaQuery} {
    width: 400px;
    height: 310px;
    border-radius: 16px;
  }
`;

const MockupImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function HeroMockup() {
  const [emblaRef] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    dragFree: true,
    startIndex: 1,
    breakpoints: {
      '(min-width: 768px)': { active: false },
    },
  });

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}>
      <Viewport ref={emblaRef}>
        <MockupArea>
          <PhoneMockup>
            <MockupImage src={phoneImage} alt="QR 주문 화면" />
          </PhoneMockup>
          <CenterAnchor />
          <DashboardMockup>
            <MockupImage src={dashboardImage} alt="주문 관리 대시보드" />
          </DashboardMockup>
        </MockupArea>
      </Viewport>
    </motion.div>
  );
}

export default HeroMockup;
