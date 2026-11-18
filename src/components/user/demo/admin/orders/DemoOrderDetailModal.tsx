import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { OrderProduct } from '@@types/index';
import { orderModalReadOnlyAtom } from '@jotai/atoms';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import DemoOrderModalFooter from './DemoOrderModalFooter';
import DemoOrderModalHeader from './DemoOrderModalHeader';
import DemoOrderModalMain from './DemoOrderModalMain';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(70, 74, 77, 0.3);
  backdrop-filter: blur(2px);
  z-index: 2000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 10px;
  border: 1px solid ${Color.BORDER_GREY};
  width: 500px;
  max-height: calc(100% - 64px);
  overflow-y: auto;
  z-index: 2001;
  gap: 12px;
  box-shadow: 0 4px 20px 0 rgba(92, 92, 92, 0.05);
  ${colFlex({ justify: 'center' })}
`;

const ModalLayer = styled.div``;

function DemoOrderDetailModal() {
  const { orders, openedOrderId, adminPage } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const setReadOnly = useSetAtom(orderModalReadOnlyAtom);
  const order = orders.find((candidate) => candidate.id === openedOrderId);
  const isReadOnly = adminPage === 'table';

  const close = () => dispatch({ type: 'ORDER_OPEN', orderId: null });

  useEffect(() => {
    setReadOnly(isReadOnly);
  }, [isReadOnly, setReadOnly]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch({ type: 'ORDER_OPEN', orderId: null });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  if (!order) return null;

  const closeAndRun = (action: () => void) => () => {
    close();
    action();
  };

  const handleServe = (orderProduct: OrderProduct, delta: number) => {
    dispatch({ type: 'PRODUCT_SERVE', orderId: order.id, orderProductId: orderProduct.id, delta });
  };

  return (
    <ModalLayer>
      <ModalOverlay onClick={close} />
      <ModalContainer data-demo-modal role="dialog" aria-modal="true">
        <DemoOrderModalHeader order={order} isReadOnly={isReadOnly} onClose={close} onUnsupported={() => dispatch({ type: 'UNSUPPORTED' })} />
        <DemoOrderModalMain order={order} isReadOnly={isReadOnly} onServe={handleServe} />
        <DemoOrderModalFooter
          orderStatus={order.status}
          isReadOnly={isReadOnly}
          actions={{
            cancel: closeAndRun(() => dispatch({ type: 'ORDER_CANCEL', orderId: order.id })),
            pay: closeAndRun(() => dispatch({ type: 'PAYMENT_CHECK', orderId: order.id })),
            refund: closeAndRun(() => dispatch({ type: 'PAYMENT_UNDO', orderId: order.id })),
            serve: closeAndRun(() => dispatch({ type: 'ORDER_SERVE_ALL', orderId: order.id })),
            unserve: closeAndRun(() => dispatch({ type: 'SERVE_UNDO', orderId: order.id })),
          }}
        />
      </ModalContainer>
    </ModalLayer>
  );
}

export default DemoOrderDetailModal;
