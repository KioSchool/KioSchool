import { Outlet } from 'react-router-dom';
import usePreventZoom from '@hooks/usePreventZoom';

function NoZoomLayout() {
  usePreventZoom();

  return <Outlet />;
}

export default NoZoomLayout;
