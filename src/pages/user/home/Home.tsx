import styled from '@emotion/styled';
import { MotionConfig } from 'framer-motion';
import AppContainer from '@components/common/container/AppContainer';
import AppFaqButton from '@components/common/button/AppFaqButton';
import { colFlex } from '@styles/flexStyles';
import HeroSection from '@components/user/home/hero/HeroSection';
import PainPointSection from '@components/user/home/PainPointSection';
import HowItWorksSection from '@components/user/home/how-it-works/HowItWorksSection';
import FeaturesSection from '@components/user/home/features/FeaturesSection';
import SocialProofSection from '@components/user/home/social-proof/SocialProofSection';
import CtaSection from '@components/user/home/CtaSection';

const LandingWrapper = styled.div`
  user-select: none;
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
        <AppContainer useFlex={colFlex()} customWidth={'100%'} useTitle={false} useFullHeight={true}>
          <>
            <HeroSection />
            <PainPointSection />
            <HowItWorksSection />
            <FeaturesSection />
            <SocialProofSection />
            <CtaSection />
          </>
        </AppContainer>
      </LandingWrapper>
      <AppFaqButton />
    </MotionConfig>
  );
}

export default Home;
