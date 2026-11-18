import { ToastContainer } from 'react-toastify';
import { DEMO_ADMIN_TOAST_CONTAINER_ID } from '@hooks/user/useDemoPayUndoToast';

function DemoAdminToasts() {
  return <ToastContainer containerId={DEMO_ADMIN_TOAST_CONTAINER_ID} position="top-right" />;
}

export default DemoAdminToasts;
