import styled from '@emotion/styled';
import { MotionConfig } from 'framer-motion';
import PageSeo from '@components/common/page/PageSeo';
import AppContainer from '@components/common/container/AppContainer';
import SiteFooter from '@components/common/footer/SiteFooter';
import { colFlex } from '@styles/flexStyles';
import { MARKETING_SEO } from '@constants/marketingSeo';
import { LANDING_HOME_FAQ } from '@constants/data/landingContent';
import HeroSection from '@components/user/home/hero/HeroSection';
import DemoBanner from '@components/user/home/DemoBanner';
import PainPointSection from '@components/user/home/PainPointSection';
import FeaturesSection from '@components/user/home/features/FeaturesSection';
import SocialProofSection from '@components/user/home/social-proof/SocialProofSection';
import HowItWorksSection from '@components/user/home/how-it-works/HowItWorksSection';
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

function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <LandingWrapper>
        <PageSeo {...MARKETING_SEO.home} />
        <AppContainer useFlex={colFlex()} customWidth={'100%'} useTitle={false} useFullHeight={true}>
          <Sections>
            <HeroSection />
            <DemoBanner />
            <PainPointSection />
            <FeaturesSection />
            <SocialProofSection />
            <HowItWorksSection />
            <LandingFaqSection items={LANDING_HOME_FAQ} />
            <LandingCtaSection location="cta_section" />
          </Sections>
        </AppContainer>
        <SiteFooter />
      </LandingWrapper>
    </MotionConfig>
  );
}

export default Home;
