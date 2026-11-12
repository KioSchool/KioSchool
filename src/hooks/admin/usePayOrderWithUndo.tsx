import { Id, toast } from 'react-toastify';
import { Order } from '@@types/index';
import { GA_EVENT, ORDER_EVENT_LOCATION } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import PayUndoToast from '@components/admin/order/realtime/PayUndoToast';

const PAY_UNDO_TOAST_ID_PREFIX = 'order-pay-undo';
// 가을 시즌 결제 확인 되돌림의 42%가 10초 안에 일어났다
const PAY_UNDO_TOAST_MS = 10_000;
const MS_PER_SECOND = 1000;
const PAY_FAILED_MESSAGE = '결제 확인에 실패했습니다. 잠시 후 다시 시도해주세요.';
const UNDO_FAILED_MESSAGE = '되돌리기에 실패했습니다. 주문 상세에서 다시 시도해주세요.';

// react-toastify는 같은 toastId가 닫히는 애니메이션 중이면 새 토스트를 무시한다. 그래서 매번 새 id를 주고 직전 것만 닫는다
let currentPayUndoToastId: Id | null = null;

function usePayOrderWithUndo(workspaceId: string | undefined) {
  const { payOrder, refundOrder } = useAdminOrder(workspaceId);

  const confirmPayment = async (order: Order) => {
    const isPaid = await payOrder(order.id);
    if (!isPaid) {
      toast.error(PAY_FAILED_MESSAGE);
      return;
    }

    trackEvent(GA_EVENT.ORDER_PAY_CONFIRM, { workspace_id: workspaceId, location: ORDER_EVENT_LOCATION.CARD_BUTTON });
    const confirmedAt = Date.now();

    if (currentPayUndoToastId !== null) toast.dismiss(currentPayUndoToastId);
    const toastId = `${PAY_UNDO_TOAST_ID_PREFIX}-${order.id}-${Date.now()}`;
    currentPayUndoToastId = toastId;

    const handleUndo = async () => {
      toast.dismiss(toastId);
      const isRefunded = await refundOrder(order.id);
      if (!isRefunded) {
        toast.error(UNDO_FAILED_MESSAGE);
        return;
      }

      trackEvent(GA_EVENT.ORDER_PAY_UNDO, { workspace_id: workspaceId, seconds_since_confirm: Math.round((Date.now() - confirmedAt) / MS_PER_SECOND) });
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
