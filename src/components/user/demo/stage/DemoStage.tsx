import { match } from 'ts-pattern';
import DemoMobileStage from '@components/user/demo/mobile/DemoMobileStage';
import useIsMobile from '@hooks/useIsMobile';
import DemoDesktopStage from './DemoDesktopStage';

function DemoStage() {
  const isMobile = useIsMobile();

  return match(isMobile)
    .with(true, () => <DemoMobileStage />)
    .otherwise(() => <DemoDesktopStage />);
}

export default DemoStage;
