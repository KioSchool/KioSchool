import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { getDemoStep } from '@constants/data/demo/demoSteps';
import DemoAdminScreen from '@components/user/demo/admin/DemoAdminScreen';
import DemoAdminToasts from '@components/user/demo/admin/DemoAdminToasts';
import DemoGuide from '@components/user/demo/DemoGuide';
import DemoGuestScreen from '@components/user/demo/guest/DemoGuestScreen';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { DEMO_ADMIN_DESIGN, DEMO_GUEST_DESIGN, DEMO_STAGE_WIDTH } from '@styles/demoStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { recordDemoTap } from '@utils/demo/demoAnalytics';
import DemoActions from './DemoActions';
import DemoDeviceFrame from './DemoDeviceFrame';

const PHONE_FRAME_WIDTH = 280;
const LAPTOP_FRAME_WIDTH = 860;

const Container = styled.div`
  margin-top: 24px;
`;

const GuideArea = styled.div`
  max-width: ${DEMO_STAGE_WIDTH}px;
  margin: 0 auto;
`;

const Devices = styled.div`
  gap: 40px;
  margin-top: 32px;
  ${rowFlex({ justify: 'center', align: 'flex-end' })}
`;

const PhoneColumn = styled.div`
  flex: none;
  width: ${PHONE_FRAME_WIDTH}px;
  gap: 14px;
  ${colFlex({ align: 'stretch' })}
`;

const LaptopColumn = styled.div`
  flex: 1 1 ${LAPTOP_FRAME_WIDTH}px;
  max-width: ${LAPTOP_FRAME_WIDTH}px;
  min-width: 0;
  gap: 14px;
  ${colFlex({ align: 'stretch' })}
`;

const activeLabelStyle = css`
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
`;

const DeviceLabel = styled.div<{ isActive: boolean }>`
  min-height: 28px;
  gap: 8px;
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.CAPTION};
  ${rowFlex({ justify: 'center', align: 'center' })}
  ${({ isActive }) => isActive && activeLabelStyle}
`;

const TurnBadge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: ${LandingColor.TINT};
  font-size: 13px;
  font-weight: 700;
  color: ${LandingColor.ACCENT_TEXT};
`;

function DemoDesktopStage() {
  const state = useAtomValue(demoStateAtom);
  const step = getDemoStep(state.step);
  const isGuestTurn = step.device === 'guest';
  const isAdminTurn = step.device === 'admin';

  return (
    <Container>
      <GuideArea>
        <DemoGuide stepNumber={state.step} text={step.guide} />
      </GuideArea>
      <Devices onClickCapture={recordDemoTap}>
        <PhoneColumn>
          <DemoDeviceFrame device="guest" shape="phone" designWidth={DEMO_GUEST_DESIGN.width} designHeight={DEMO_GUEST_DESIGN.height}>
            <DemoGuestScreen />
          </DemoDeviceFrame>
          <DeviceLabel isActive={isGuestTurn}>손님 폰{isGuestTurn && <TurnBadge>이 화면에서 해 보세요</TurnBadge>}</DeviceLabel>
        </PhoneColumn>
        <LaptopColumn>
          <DemoDeviceFrame
            device="admin"
            shape="laptop"
            designWidth={DEMO_ADMIN_DESIGN.width}
            designHeight={DEMO_ADMIN_DESIGN.height}
            overlay={<DemoAdminToasts />}
          >
            <DemoAdminScreen />
          </DemoDeviceFrame>
          <DeviceLabel isActive={isAdminTurn}>
            운영진 화면
            {isAdminTurn && <TurnBadge>이 화면에서 해 보세요</TurnBadge>}
          </DeviceLabel>
        </LaptopColumn>
      </Devices>
      <DemoActions />
    </Container>
  );
}

export default DemoDesktopStage;
