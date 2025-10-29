import { OrderStatus } from '@@types/index';
import styled from '@emotion/styled';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { rowFlex } from '@styles/flexStyles';
import { useParams } from 'react-router-dom';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';

const BaseButton = styled.button`
  width: 136px;
  height: 32px;
  border-radius: 40px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'LINE Seed Sans KR', sans-serif;
  border: 1px solid ${Color.KIO_ORANGE};
  ${expandButtonStyle}
`;

const ModalSecondaryButton = styled(BaseButton)`
  background-color: ${Color.WHITE};
  color: #464a4d;
  border: 1px solid #e8eef2;
`;

const ModalPrimaryButton = styled(BaseButton)`
  background-color: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
`;

const ModalFooter = styled.div`
  padding: 0 20px 30px 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const generateOrderActionElements = (orderStatus: OrderStatus, actionHandlers: Record<string, () => void>) => {
  switch (orderStatus) {
    case OrderStatus.NOT_PAID:
      return [
        <ModalSecondaryButton key="cancel" onClick={actionHandlers.cancelOrder}>
          주문 취소
        </ModalSecondaryButton>,
        <ModalPrimaryButton key="pay" onClick={actionHandlers.payOrder}>
          결제 완료
        </ModalPrimaryButton>,
      ];
    case OrderStatus.PAID:
      return [
        <ModalSecondaryButton key="refund" onClick={actionHandlers.refundOrder}>
          되돌리기
        </ModalSecondaryButton>,
        <ModalPrimaryButton key="serve" onClick={actionHandlers.serveOrder}>
          서빙 완료
        </ModalPrimaryButton>,
      ];
    case OrderStatus.SERVED:
      return [
        <ModalSecondaryButton key="pay-again" onClick={actionHandlers.payOrder}>
          되돌리기
        </ModalSecondaryButton>,
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
