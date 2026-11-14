import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import OrderPayFooter from '@components/user/order/pay/OrderPayFooter';

const MotionContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;
`;

interface OrderButtonProps {
  showButton: boolean;
  buttonLabel: string;
  onClick?: () => void;
  disabled?: boolean;
}

function OrderButton({ showButton, buttonLabel, onClick, disabled }: OrderButtonProps) {
  return (
    <AnimatePresence>
      {showButton && (
        <MotionContainer
          className={'order-button-container'}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <OrderPayFooter label={buttonLabel} caption={null} disabled={disabled} onClick={onClick} fixed={false} />
        </MotionContainer>
      )}
    </AnimatePresence>
  );
}

export default OrderButton;
