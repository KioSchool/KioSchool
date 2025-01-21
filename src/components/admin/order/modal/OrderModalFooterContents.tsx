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

function OrderModalFooterContents({ orderStatus, id }: ModalFooterContentsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder, serveOrder, refundOrder } = useAdminOrder(workspaceId);

  return (
    <ModalFooter>
      {orderStatus === OrderStatus.NOT_PAID ? (
        <RoundedAppButton onClick={() => cancelOrder(id)}>주문 취소</RoundedAppButton>
      ) : (
        <RoundedAppButton onClick={() => (orderStatus === OrderStatus.PAID ? refundOrder(id) : payOrder(id))}>되돌리기</RoundedAppButton>
      )}

      {orderStatus === OrderStatus.NOT_PAID && <RoundedAppButton onClick={() => payOrder(id)}>결제 완료</RoundedAppButton>}
      {orderStatus === OrderStatus.PAID && <RoundedAppButton onClick={() => serveOrder(id)}>서빙 완료</RoundedAppButton>}
      {orderStatus === OrderStatus.SERVED && null}
    </ModalFooter>
  );
}

export default OrderModalFooterContents;
