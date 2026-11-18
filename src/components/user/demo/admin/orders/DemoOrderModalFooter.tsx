import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { OrderStatus } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { rowFlex } from '@styles/flexStyles';

const ModalFooter = styled.div`
  padding: 0 20px 30px 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

export interface DemoOrderFooterActions {
  cancel: () => void;
  pay: () => void;
  refund: () => void;
  serve: () => void;
  unserve: () => void;
}

interface DemoOrderModalFooterProps {
  orderStatus: OrderStatus;
  isReadOnly: boolean;
  actions: DemoOrderFooterActions;
}

function DemoOrderModalFooter({ orderStatus, isReadOnly, actions }: DemoOrderModalFooterProps) {
  if (isReadOnly) return <ModalFooter />;

  return (
    <ModalFooter>
      {match(orderStatus)
        .with(OrderStatus.NOT_PAID, () => [
          <NewCommonButton key="cancel" color="blue_gray" size="sm" onClick={actions.cancel}>
            주문 취소
          </NewCommonButton>,
          <NewCommonButton key="pay" size="sm" onClick={actions.pay}>
            결제 완료
          </NewCommonButton>,
        ])
        .with(OrderStatus.PAID, () => [
          <NewCommonButton key="refund" color="blue_gray" size="sm" onClick={actions.refund}>
            되돌리기
          </NewCommonButton>,
          <NewCommonButton key="serve" size="sm" onClick={actions.serve}>
            서빙 완료
          </NewCommonButton>,
        ])
        .with(OrderStatus.SERVED, () => [
          <NewCommonButton key="unserve" color="blue_gray" size="sm" onClick={actions.unserve}>
            되돌리기
          </NewCommonButton>,
        ])
        .otherwise(() => [])}
    </ModalFooter>
  );
}

export default DemoOrderModalFooter;
