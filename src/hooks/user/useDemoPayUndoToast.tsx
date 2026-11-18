import { Id, toast } from 'react-toastify';
import { useAtomValue, useSetAtom } from 'jotai';
import { Order } from '@@types/index';
import PayUndoToast from '@components/admin/order/realtime/PayUndoToast';
import { demoStateAtom } from '@jotai/user/demoAtoms';

export const DEMO_ADMIN_TOAST_CONTAINER_ID = 'demo-admin';
const PAY_UNDO_TOAST_ID_PREFIX = 'demo-order-pay-undo';
const PAY_UNDO_TOAST_MS = 10_000;

// react-toastify는 같은 toastId가 닫히는 애니메이션 중이면 새 토스트를 무시한다. 그래서 매번 새 id를 주고 직전 것만 닫는다
let currentPayUndoToastId: Id | null = null;

function useDemoPayUndoToast() {
  const { guestOrderId } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);

  return (order: Order) => {
    dispatch({ type: 'PAYMENT_CHECK', orderId: order.id });
    if (order.id !== guestOrderId) return;

    if (currentPayUndoToastId !== null) toast.dismiss(currentPayUndoToastId);
    const toastId = `${PAY_UNDO_TOAST_ID_PREFIX}-${order.id}-${Date.now()}`;
    currentPayUndoToastId = toastId;

    const handleUndo = () => {
      toast.dismiss(toastId);
      dispatch({ type: 'PAYMENT_UNDO', orderId: order.id });
    };

    toast.success(<PayUndoToast message={`${order.tableNumber}번 ${order.customerName} 결제 확인`} onUndo={handleUndo} />, {
      toastId,
      containerId: DEMO_ADMIN_TOAST_CONTAINER_ID,
      autoClose: PAY_UNDO_TOAST_MS,
      closeOnClick: false,
    });
  };
}

export default useDemoPayUndoToast;
