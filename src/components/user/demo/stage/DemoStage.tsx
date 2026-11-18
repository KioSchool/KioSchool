import { match } from 'ts-pattern';
import useIsMobile from '@hooks/useIsMobile';
import DemoDesktopStage from './DemoDesktopStage';
import DemoMobileStage from './DemoMobileStage';

function DemoStage() {
  const isMobile = useIsMobile();

  return match(isMobile)
    .with(true, () => <DemoMobileStage />)
    .otherwise(() => <DemoDesktopStage />);
}

export default DemoStage;
