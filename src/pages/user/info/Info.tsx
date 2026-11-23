import styled from '@emotion/styled';
import { MotionConfig } from 'framer-motion';
import PageSeo from '@components/common/page/PageSeo';
import AppContainer from '@components/common/container/AppContainer';
import SiteFooter from '@components/common/footer/SiteFooter';
import { colFlex } from '@styles/flexStyles';
import { MARKETING_SEO } from '@constants/marketingSeo';
import { LANDING_INFO_FAQ } from '@constants/data/landingContent';
import InfoHeroSection from '@components/user/info/InfoHeroSection';
import InfoOrderFlowSection from '@components/user/info/InfoOrderFlowSection';
import InfoOrderProcessSection from '@components/user/info/InfoOrderProcessSection';
import InfoTableSection from '@components/user/info/InfoTableSection';
import InfoTableLayoutSection from '@components/user/info/InfoTableLayoutSection';
import InfoMenuSection from '@components/user/info/InfoMenuSection';
import InfoSettlementSection from '@components/user/info/InfoSettlementSection';
import InfoMoneyFlowSection from '@components/user/info/InfoMoneyFlowSection';
import InfoPreparationSection from '@components/user/info/InfoPreparationSection';
import InfoCaseStudiesSection from '@components/user/info/InfoCaseStudiesSection';
import InfoTeamSection from '@components/user/info/InfoTeamSection';
import LandingFaqSection from '@components/user/landing/LandingFaqSection';
import LandingCtaSection from '@components/user/landing/LandingCtaSection';

const Sections = styled.div`
  width: 100%;
`;

const LandingWrapper = styled.div`
  word-break: keep-all;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

function Info() {
  return (
    <MotionConfig reducedMotion="user">
      <LandingWrapper>
        <PageSeo {...MARKETING_SEO.info} />
        <AppContainer useFlex={colFlex()} customWidth={'100%'} useTitle={false} useFullHeight={true}>
          <Sections>
            <InfoHeroSection />
            <InfoOrderFlowSection />
            <InfoOrderProcessSection />
            <InfoTableSection />
            <InfoTableLayoutSection />
            <InfoMenuSection />
            <InfoSettlementSection />
            <InfoMoneyFlowSection />
            <InfoPreparationSection />
            <InfoCaseStudiesSection />
            <InfoTeamSection />
            <LandingFaqSection items={LANDING_INFO_FAQ} collapsible />
            <LandingCtaSection location="info_cta" />
          </Sections>
        </AppContainer>
        <SiteFooter />
      </LandingWrapper>
    </MotionConfig>
  );
}

export default Info;
