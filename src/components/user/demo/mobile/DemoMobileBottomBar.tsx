import styled from '@emotion/styled';
import { DemoDevice } from '@constants/data/demo/demoSteps';
import LandingButton from '@components/user/landing/LandingButton';
import useDemoActionButton from '@hooks/user/useDemoActionButton';
import { LandingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import DemoMobileTabs from './DemoMobileTabs';

const Bar = styled.div`
  flex: none;
  padding: 14px 16px calc(14px + env(safe-area-inset-bottom));
  gap: 12px;
  border-top: 1px solid ${LandingColor.LINE};
  background: #ffffff;
  ${rowFlex({ align: 'center' })}
`;

interface DemoMobileBottomBarProps {
  view: DemoDevice;
  onChangeView: (device: DemoDevice) => void;
}

function DemoMobileBottomBar({ view, onChangeView }: DemoMobileBottomBarProps) {
  const { label, variant, handleClick } = useDemoActionButton();

  return (
    <Bar>
      <DemoMobileTabs view={view} onChange={onChangeView} />
      <LandingButton label={label} variant={variant} size="small" onClick={handleClick} />
    </Bar>
  );
}

export default DemoMobileBottomBar;
