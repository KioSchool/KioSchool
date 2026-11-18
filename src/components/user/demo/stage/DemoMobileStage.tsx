import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_USER_ORDER_ID } from '@constants/data/demo/demoSeed';
import { DEMO_STEP, DemoDevice, getDemoStep } from '@constants/data/demo/demoSteps';
import DemoAdminScreen from '@components/user/demo/admin/DemoAdminScreen';
import DemoAdminToasts from '@components/user/demo/admin/DemoAdminToasts';
import DemoGuide from '@components/user/demo/DemoGuide';
import DemoGuestScreen from '@components/user/demo/guest/DemoGuestScreen';
import useWindowHeight from '@hooks/common/useWindowHeight';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { DEMO_ADMIN_DESIGN, DEMO_GUEST_DESIGN } from '@styles/demoStyles';
import { rowFlex } from '@styles/flexStyles';
import DemoActions from './DemoActions';
import DemoDeviceFrame from './DemoDeviceFrame';
import DemoMobileTabs from './DemoMobileTabs';

// 탭·안내 줄·버튼 줄이 기기 화면과 한 화면에 같이 보이도록 남겨 두는 높이
const MOBILE_STAGE_CHROME_HEIGHT = 230;
const MIN_SCREEN_HEIGHT = 360;
const MAX_SCREEN_HEIGHT = 640;

const focusOf = (name: string) => `[data-demo-focus="${name}"]`;

// 단계마다 확대할 곳. 앞에 있는 것이 화면에 있으면 그것을 먼저 쓴다
const ADMIN_FOCUS_BY_STEP: Record<number, string[]> = {
  [DEMO_STEP.START]: [focusOf('table-7-action'), focusOf('table-7')],
  [DEMO_STEP.PAYMENT_CHECK]: [focusOf(`order-check-${DEMO_USER_ORDER_ID}`)],
  [DEMO_STEP.SERVE]: ['[data-demo-modal]', focusOf(`order-paid-${DEMO_USER_ORDER_ID}`)],
  [DEMO_STEP.EXTEND]: [focusOf('table-7-extend'), focusOf('table-7')],
  [DEMO_STEP.END]: [focusOf('table-7-confirm'), focusOf('table-7-action'), focusOf('table-7')],
};

const NO_FOCUS: string[] = [];

const Container = styled.div`
  margin-top: 16px;
`;

const ZoomRow = styled.div`
  height: 28px;
  margin-bottom: 4px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

const ZoomButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${LandingColor.SUB_TEXT};
  cursor: pointer;
`;

const GuideArea = styled.div`
  margin-top: 12px;
`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function DemoMobileStage() {
  const state = useAtomValue(demoStateAtom);
  const step = getDemoStep(state.step);
  const [view, setView] = useState<DemoDevice>(step.device);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const windowHeight = useWindowHeight();
  const screenHeight = clamp(windowHeight - MOBILE_STAGE_CHROME_HEIGHT, MIN_SCREEN_HEIGHT, MAX_SCREEN_HEIGHT);
  const focusSelectors = ADMIN_FOCUS_BY_STEP[state.step] ?? NO_FOCUS;
  const zoomLabel = match(isZoomedOut)
    .with(true, () => '누를 곳 보기')
    .otherwise(() => '전체 보기');

  useEffect(() => {
    setView(step.device);
    setIsZoomedOut(false);
  }, [state.step, step.device]);

  return (
    <Container>
      <DemoMobileTabs view={view} onChange={setView} />
      {view === 'admin' && focusSelectors.length > 0 && (
        <ZoomRow>
          <ZoomButton type="button" onClick={() => setIsZoomedOut((prev) => !prev)}>
            {zoomLabel}
          </ZoomButton>
        </ZoomRow>
      )}
      {match(view)
        .with('guest', () => (
          <DemoDeviceFrame device="guest" shape="phone" designWidth={DEMO_GUEST_DESIGN.width} designHeight={DEMO_GUEST_DESIGN.height} fitHeight={screenHeight}>
            <DemoGuestScreen />
          </DemoDeviceFrame>
        ))
        .with('admin', () => (
          <DemoDeviceFrame
            device="admin"
            shape="laptop"
            designWidth={DEMO_ADMIN_DESIGN.width}
            designHeight={DEMO_ADMIN_DESIGN.height}
            frameHeight={screenHeight}
            focusSelectors={focusSelectors}
            isZoomedOut={isZoomedOut}
            overlay={<DemoAdminToasts />}
          >
            <DemoAdminScreen />
          </DemoDeviceFrame>
        ))
        .exhaustive()}
      <GuideArea>
        <DemoGuide stepNumber={state.step} text={step.guide} />
      </GuideArea>
      <DemoActions />
    </Container>
  );
}

export default DemoMobileStage;
