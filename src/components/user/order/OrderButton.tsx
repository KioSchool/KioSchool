import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { AnimatePresence, motion } from 'framer-motion';

const MotionContainer = styled(motion.div)`
  position: fixed;
  bottom: max(24px, env(safe-area-inset-bottom));
  width: 100vw;
  height: 50px;
  z-index: 11;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const OrderButtonSubContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 16px 32px 0 rgba(194, 191, 172, 0.6);
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
          <OrderButtonSubContainer className={'order-button-sub-container'}>
            <NewCommonButton
              customSize={{ width: 290, height: 50, font: 18, borderRadius: 15 }}
              style={{ fontWeight: 'bold' }}
              onClick={onClick}
              disabled={disabled}
            >
              {buttonLabel}
            </NewCommonButton>
          </OrderButtonSubContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
}

export default OrderButton;
