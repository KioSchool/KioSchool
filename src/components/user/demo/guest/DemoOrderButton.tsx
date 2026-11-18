import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const ORDER_BUTTON_SIZE = { width: 290, height: 54, font: 17, borderRadius: 14 };

const MotionContainer = styled(motion.div)`
  position: fixed;
  left: 0;
  bottom: 24px;
  width: 100%;
  z-index: 11;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const OrderButtonSubContainer = styled.div`
  padding: 10px;
  border-radius: 20px;
  background: ${Color.WHITE};
  box-shadow: 0 16px 32px 0 rgba(194, 191, 172, 0.6);
`;

interface DemoOrderButtonProps {
  showButton: boolean;
  buttonLabel: string;
  onClick: () => void;
}

function DemoOrderButton({ showButton, buttonLabel, onClick }: DemoOrderButtonProps) {
  return (
    <AnimatePresence>
      {showButton && (
        <MotionContainer
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <OrderButtonSubContainer>
            <NewCommonButton customSize={ORDER_BUTTON_SIZE} onClick={onClick}>
              {buttonLabel}
            </NewCommonButton>
          </OrderButtonSubContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
}

export default DemoOrderButton;
