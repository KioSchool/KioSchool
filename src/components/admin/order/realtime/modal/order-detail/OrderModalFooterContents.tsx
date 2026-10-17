import { OrderStatus } from '@@types/index';
import styled from '@emotion/styled';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { rowFlex } from '@styles/flexStyles';
import { useParams } from 'react-router-dom';
import { orderModalReadOnlyAtom } from '@jotai/atoms';
import { useAtomValue } from 'jotai';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { GA_EVENT, ORDER_EVENT_LOCATION } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';

const ModalFooter = styled.div`
  padding: 0 20px 30px 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const generateOrderActionElements = (orderStatus: OrderStatus, actionHandlers: Record<string, () => void>) => {
  switch (orderStatus) {
    case OrderStatus.NOT_PAID:
      return [
        <NewCommonButton key="cancel" color="blue_gray" size="sm" onClick={actionHandlers.cancelOrder}>
          주문 취소
        </NewCommonButton>,
        <NewCommonButton key="pay" size="sm" onClick={actionHandlers.confirmPayment}>
          결제 완료
        </NewCommonButton>,
      ];
    case OrderStatus.PAID:
      return [
        <NewCommonButton key="refund" color="blue_gray" size="sm" onClick={actionHandlers.refundOrder}>
          되돌리기
        </NewCommonButton>,
        <NewCommonButton key="serve" size="sm" onClick={actionHandlers.serveOrder}>
          서빙 완료
        </NewCommonButton>,
      ];
    case OrderStatus.SERVED:
      return [
        <NewCommonButton key="pay-again" color="blue_gray" size="sm" onClick={actionHandlers.payOrder}>
          되돌리기
        </NewCommonButton>,
      ];
    default:
      return [];
  }
};

interface OrderModalFooterContentsProps {
  orderStatus: OrderStatus;
  id: number;
  closeModal: () => void;
}

function OrderModalFooterContents({ orderStatus, id, closeModal }: OrderModalFooterContentsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder, serveOrder, refundOrder } = useAdminOrder(workspaceId);

  const readOnly = useAtomValue(orderModalReadOnlyAtom);

  if (readOnly) {
    return <ModalFooter></ModalFooter>;
  }

  // SERVED의 되돌리기도 payOrder(SERVED → PAID)를 쓰므로, 결제 확인 이벤트는 미결제 버튼 전용 핸들러에서만 보낸다
  const actionHandlers = {
    confirmPayment: () => {
      closeModal();
      payOrder(id);
      trackEvent(GA_EVENT.ORDER_PAY_CONFIRM, { workspace_id: workspaceId, location: ORDER_EVENT_LOCATION.DETAIL_MODAL });
    },
    payOrder: () => {
      closeModal();
      payOrder(id);
    },
    cancelOrder: () => {
      closeModal();
      cancelOrder(id);
    },
    serveOrder: () => {
      closeModal();
      serveOrder(id);
    },
    refundOrder: () => {
      closeModal();
      refundOrder(id);
    },
  };

  const elements = generateOrderActionElements(orderStatus, actionHandlers);

  return <ModalFooter>{elements}</ModalFooter>;
}

export default OrderModalFooterContents;
