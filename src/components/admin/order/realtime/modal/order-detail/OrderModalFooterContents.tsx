import { OrderStatus } from '@@types/index';
import styled from '@emotion/styled';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { rowFlex } from '@styles/flexStyles';
import { useParams } from 'react-router-dom';
import { orderModalReadOnlyAtom } from '@jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import NewCommonButton from '@components/common/button/NewCommonButton';

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
        <NewCommonButton key="pay" size="sm" onClick={actionHandlers.payOrder}>
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

  const actionHandlers = {
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
