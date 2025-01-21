import { OrderStatus } from '@@types/index';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import styled from '@emotion/styled';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { rowFlex } from '@styles/flexStyles';
import { useParams } from 'react-router-dom';

const ModalFooter = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  padding-top: 15px;
  width: 100%;
`;

interface ModalFooterContentsProps {
  orderStatus: OrderStatus;
  id: number;
}

const getActions = (orderStatus: OrderStatus, actionHandlers: Record<string, () => void>) => {
  switch (orderStatus) {
    case OrderStatus.NOT_PAID:
      return [
        { label: '주문 취소', onClick: actionHandlers.cancelOrder },
        { label: '결제 완료', onClick: actionHandlers.payOrder },
      ];
    case OrderStatus.PAID:
      return [
        { label: '되돌리기', onClick: actionHandlers.refundOrder },
        { label: '서빙 완료', onClick: actionHandlers.serveOrder },
      ];
    case OrderStatus.SERVED:
      return [{ label: '되돌리기', onClick: actionHandlers.payOrder }];
    default:
      return [];
  }
};

function OrderModalFooterContents({ orderStatus, id }: ModalFooterContentsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder, serveOrder, refundOrder } = useAdminOrder(workspaceId);

  const actionHandlers = {
    payOrder: () => payOrder(id),
    cancelOrder: () => cancelOrder(id),
    serveOrder: () => serveOrder(id),
    refundOrder: () => refundOrder(id),
  };

  const actions = getActions(orderStatus, actionHandlers);

  return (
    <ModalFooter>
      {actions.map((action, index) => (
        <RoundedAppButton key={index} onClick={action.onClick}>
          {action.label}
        </RoundedAppButton>
      ))}
    </ModalFooter>
  );
}

export default OrderModalFooterContents;
