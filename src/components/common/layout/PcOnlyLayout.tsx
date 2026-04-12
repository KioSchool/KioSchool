import { Outlet } from 'react-router-dom';
import useIsMobile from '@hooks/useIsMobile';
import MobileFallback from '@components/common/fallback/MobileFallback';

function PcOnlyLayout() {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileFallback />;
  return <Outlet />;
}

export default PcOnlyLayout;
