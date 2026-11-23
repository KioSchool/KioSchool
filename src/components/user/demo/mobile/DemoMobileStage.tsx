import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { DemoDevice, getDemoStep } from '@constants/data/demo/demoSteps';
import DemoGuide from '@components/user/demo/DemoGuide';
import DemoGuestScreen from '@components/user/demo/guest/DemoGuestScreen';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { colFlex } from '@styles/flexStyles';
import DemoMobileAdminScreen from './DemoMobileAdminScreen';
import DemoMobileBottomBar from './DemoMobileBottomBar';
import DemoMobileDeviceBar from './DemoMobileDeviceBar';
import DemoMobileGuestPeek from './DemoMobileGuestPeek';
import DemoMobileHeader from './DemoMobileHeader';
import DemoMobileIntroSheet from './DemoMobileIntroSheet';
import DemoMobileOverview from './DemoMobileOverview';

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  overflow: hidden;
  background: #ffffff;
  ${colFlex()}
`;

const GuideArea = styled.div`
  flex: none;
  padding: 0 16px 10px;
`;

const Screen = styled.div`
  flex: 1;
  min-height: 0;
  ${colFlex()}
`;

// transform은 손님 화면·주문 상세처럼 position: fixed로 뜨는 창을 이 안에 가두기 위한 것
const DeviceBody = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  transform: translateZ(0);
`;

function DemoMobileStage() {
  const state = useAtomValue(demoStateAtom);
  const step = getDemoStep(state.step);
  const [view, setView] = useState<DemoDevice>(step.device);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  useEffect(() => {
    setView(step.device);
    setIsOverviewOpen(false);
  }, [state.step, step.device]);

  return (
    <Container>
      <DemoMobileHeader chapter={step.chapter} stepNumber={state.step} />
      <GuideArea>
        <DemoGuide stepNumber={state.step} text={step.guide} />
      </GuideArea>
      <Screen>
        <DemoMobileDeviceBar view={view} adminPage={state.adminPage} onOpenOverview={() => setIsOverviewOpen(true)} />
        <DeviceBody data-demo-device={view}>
          {match(view)
            .with('guest', () => <DemoGuestScreen />)
            .with('admin', () => <DemoMobileAdminScreen />)
            .exhaustive()}
          <DemoMobileGuestPeek isAdminView={view === 'admin'} onShowGuest={() => setView('guest')} />
        </DeviceBody>
      </Screen>
      <DemoMobileBottomBar view={view} onChangeView={setView} />
      {isOverviewOpen && <DemoMobileOverview onClose={() => setIsOverviewOpen(false)} />}
      <DemoMobileIntroSheet />
    </Container>
  );
}

export default DemoMobileStage;
