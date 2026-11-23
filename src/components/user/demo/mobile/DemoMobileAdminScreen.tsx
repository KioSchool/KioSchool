import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_USER_ORDER_ID } from '@constants/data/demo/demoSeed';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import DemoAdminToasts from '@components/user/demo/admin/DemoAdminToasts';
import DemoAdminOrdersPage from '@components/user/demo/admin/orders/DemoAdminOrdersPage';
import DemoOrderDetailModal from '@components/user/demo/admin/orders/DemoOrderDetailModal';
import DemoAdminStatsPage from '@components/user/demo/admin/stats/DemoAdminStatsPage';
import useDemoLinkBlock from '@hooks/user/useDemoLinkBlock';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color, LandingColor } from '@resources/colors';
import DemoMobileTablePage from './DemoMobileTablePage';

const RING_FOCUS_BY_STEP: Record<number, string[]> = {
  [DEMO_STEP.START]: ['table-7', 'table-7-action'],
  [DEMO_STEP.PAYMENT_CHECK]: [`order-check-${DEMO_USER_ORDER_ID}`],
  [DEMO_STEP.SERVE]: [`order-paid-${DEMO_USER_ORDER_ID}`],
  [DEMO_STEP.EXTEND]: ['table-7-extend'],
  [DEMO_STEP.END]: ['table-7-action'],
};

const NO_RING: string[] = [];

const ringStyle = (focusNames: string[]) => css`
  ${focusNames.map((name) => `[data-demo-focus='${name}']`).join(', ')} {
    outline: 2px solid ${LandingColor.ACCENT};
    outline-offset: -2px;
  }
`;

const Screen = styled.div<{ ringFocusNames: string[] }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: ${Color.WHITE};
  color: ${Color.TEXT_DEFAULT};
  ${({ ringFocusNames }) => ringFocusNames.length > 0 && ringStyle(ringFocusNames)}
`;

const Scroll = styled.div`
  height: 100%;
  padding: 12px 16px 24px;
  overflow-y: auto;
`;

function DemoMobileAdminScreen() {
  const { adminPage, step } = useAtomValue(demoStateAtom);
  const handleLinkClick = useDemoLinkBlock();
  const ringFocusNames = RING_FOCUS_BY_STEP[step] ?? NO_RING;

  return (
    <Screen data-admin-page={adminPage} ringFocusNames={ringFocusNames} onClickCapture={handleLinkClick}>
      {match(adminPage)
        .with('table', () => <DemoMobileTablePage />)
        .with('orders', () => (
          <Scroll>
            <DemoAdminOrdersPage isMobile={true} />
          </Scroll>
        ))
        .with('stats', () => (
          <Scroll>
            <DemoAdminStatsPage isMobile={true} />
          </Scroll>
        ))
        .exhaustive()}
      <DemoOrderDetailModal isMobile={true} />
      <DemoAdminToasts />
    </Screen>
  );
}

export default DemoMobileAdminScreen;
