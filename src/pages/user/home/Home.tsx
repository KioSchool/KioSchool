import { useEffect } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { MotionConfig } from 'framer-motion';
import AppContainer from '@components/common/container/AppContainer';
import AppFaqButton from '@components/common/button/AppFaqButton';
import { colFlex } from '@styles/flexStyles';
import KioSchoolGuideYoutubeContent, { KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE } from '@components/user/home/KioSchoolGuideYoutubeContent';
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

const YOUTUBE_TOAST_ID = 'youtube-guide-toast';

function Home() {
  const [cookies] = useCookies([KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]);

  useEffect(() => {
    if (!cookies[KIOSCHOOL_GUIDE_YOUTUBE_TOAST_COOKIE]) {
      toast(<KioSchoolGuideYoutubeContent onDismiss={() => toast.dismiss(YOUTUBE_TOAST_ID)} />, {
        toastId: YOUTUBE_TOAST_ID,
        position: 'top-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        draggable: true,
        closeButton: true,
      });
    }

    return () => {
      toast.dismiss(YOUTUBE_TOAST_ID);
    };
  }, [cookies]);

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
