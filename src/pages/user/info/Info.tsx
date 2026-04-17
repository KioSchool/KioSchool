import styled from '@emotion/styled';
import { MotionConfig } from 'framer-motion';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex } from '@styles/flexStyles';
import InfoFeaturesSection from '@components/user/info/InfoFeaturesSection';
import InfoHowToUseSection from '@components/user/info/InfoHowToUseSection';
import InfoCaseStudiesSection from '@components/user/info/InfoCaseStudiesSection';
import InfoFaqSection from '@components/user/info/InfoFaqSection';
import InfoVisionSection from '@components/user/info/InfoVisionSection';
import InfoTeamSection from '@components/user/info/InfoTeamSection';
import InfoCtaSection from '@components/user/info/InfoCtaSection';

const LandingWrapper = styled.div`
  user-select: none;
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
        <AppContainer useFlex={colFlex()} customWidth={'100%'} useTitle={false} useFullHeight={true}>
          <>
            <InfoFeaturesSection />
            <InfoHowToUseSection />
            <InfoCaseStudiesSection />
            <InfoFaqSection />
            <InfoVisionSection />
            <InfoTeamSection />
            <InfoCtaSection />
          </>
        </AppContainer>
      </LandingWrapper>
    </MotionConfig>
  );
}

export default Info;
