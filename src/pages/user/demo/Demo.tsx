import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MotionConfig } from 'framer-motion';
import PageSeo from '@components/common/page/PageSeo';
import DemoHeader from '@components/user/demo/DemoHeader';
import DemoIntro from '@components/user/demo/DemoIntro';
import { MARKETING_SEO } from '@constants/marketingSeo';
import useDemoStep from '@hooks/user/useDemoStep';
import { LandingColor } from '@resources/colors';
import { mobileMediaQuery } from '@styles/globalStyles';
import { LandingInner } from '@styles/landingStyles';

// 체험 화면·상태는 /demo에서만 쓰므로 따로 불러와 다른 화면(특히 손님 주문)의 첫 로딩을 무겁게 하지 않는다
const DemoApp = lazy(() => import('@components/user/demo/DemoApp'));

const Wrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 96px;
  background: #ffffff;
  color: ${LandingColor.TEXT};
  word-break: keep-all;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ${mobileMediaQuery} {
    padding-bottom: 48px;
  }
`;

function Demo() {
  const initialStep = useDemoStep();
  const restartRef = useRef<(() => void) | null>(null);
  // 미리 그려 둔 HTML은 1단계라서, ?step= 로 들어온 사람에게 다른 단계가 잠깐 보이지 않게 마운트 뒤에 그린다
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleRestart = () => {
    restartRef.current?.();
    window.scrollTo({ top: 0 });
  };

  return (
    <MotionConfig reducedMotion="user">
      <Wrapper>
        <PageSeo {...MARKETING_SEO.demo} />
        <DemoHeader onRestart={handleRestart} />
        <LandingInner>
          <DemoIntro />
          {hasMounted && (
            <Suspense fallback={null}>
              <DemoApp initialStep={initialStep} restartRef={restartRef} />
            </Suspense>
          )}
        </LandingInner>
      </Wrapper>
    </MotionConfig>
  );
}

export default Demo;
