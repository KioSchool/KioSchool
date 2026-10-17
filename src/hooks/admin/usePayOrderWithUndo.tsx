import { Id, toast } from 'react-toastify';
import { Order } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import PayUndoToast from '@components/admin/order/realtime/PayUndoToast';

const PAY_UNDO_TOAST_ID_PREFIX = 'order-pay-undo';
// 가을 시즌 결제 확인 되돌림의 42%가 10초 안에 일어났다
const PAY_UNDO_TOAST_MS = 10_000;

// react-toastify는 같은 toastId가 닫히는 애니메이션 중이면 새 토스트를 무시한다. 그래서 매번 새 id를 주고 직전 것만 닫는다
let currentPayUndoToastId: Id | null = null;

function usePayOrderWithUndo(workspaceId: string | undefined) {
  const { payOrder, refundOrder } = useAdminOrder(workspaceId);

  const confirmPayment = (order: Order) => {
    payOrder(order.id);

    if (currentPayUndoToastId !== null) toast.dismiss(currentPayUndoToastId);
    const toastId = `${PAY_UNDO_TOAST_ID_PREFIX}-${order.id}-${Date.now()}`;
    currentPayUndoToastId = toastId;

    const handleUndo = () => {
      refundOrder(order.id);
      toast.dismiss(toastId);
    };

    toast.success(<PayUndoToast message={`${order.tableNumber}번 ${order.customerName} 결제 확인`} onUndo={handleUndo} />, {
      toastId,
      autoClose: PAY_UNDO_TOAST_MS,
      closeOnClick: false,
    });
  };

  return { confirmPayment };
}

export default usePayOrderWithUndo;
