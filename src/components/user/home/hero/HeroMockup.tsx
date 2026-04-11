import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';

const MockupArea = styled(motion.div)`
  position: relative;
  margin-top: 56px;
  z-index: 1;
  gap: 24px;
  ${rowFlex({ justify: 'center', align: 'flex-end' })};

  ${mobileMediaQuery} {
    gap: 12px;
    margin-top: 40px;
  }
`;

const PhoneMockup = styled.div`
  width: 220px;
  height: 420px;
  border-radius: 32px;
  background: ${Color.WHITE};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  ${colFlex({})};

  ${mobileMediaQuery} {
    width: 160px;
    height: 310px;
    border-radius: 24px;
  }
`;

const DashboardMockup = styled.div`
  width: 360px;
  height: 340px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  ${colFlex({})};

  ${mobileMediaQuery} {
    width: 180px;
    height: 240px;
    border-radius: 16px;
  }
`;

const MockupImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MockupPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #f2f4f6;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const PlaceholderText = styled.span`
  font-size: 13px;
  color: #adb1ba;
`;

const HERO_PHONE_IMAGE = '';
const HERO_DASHBOARD_IMAGE = '';

function HeroMockup() {
  return (
    <MockupArea initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}>
      <PhoneMockup>
        {HERO_PHONE_IMAGE ? (
          <MockupImage src={HERO_PHONE_IMAGE} alt="QR 주문 화면" />
        ) : (
          <MockupPlaceholder>
            <PlaceholderText>QR 주문 화면</PlaceholderText>
          </MockupPlaceholder>
        )}
      </PhoneMockup>
      <DashboardMockup>
        {HERO_DASHBOARD_IMAGE ? (
          <MockupImage src={HERO_DASHBOARD_IMAGE} alt="주문 관리 대시보드" />
        ) : (
          <MockupPlaceholder>
            <PlaceholderText>주문 관리 대시보드</PlaceholderText>
          </MockupPlaceholder>
        )}
      </DashboardMockup>
    </MockupArea>
  );
}

export default HeroMockup;
