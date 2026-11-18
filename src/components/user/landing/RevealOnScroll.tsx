import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const REVEAL_DURATION_SECONDS = 0.5;

const MotionBlock = styled(motion.div)`
  min-width: 0;
`;

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  offsetX?: number;
  offsetY?: number;
  amount?: number;
}

function RevealOnScroll({ children, delay = 0, offsetX = 0, offsetY = 16, amount = 0.2 }: RevealOnScrollProps) {
  return (
    <MotionBlock
      initial={{ opacity: 0, x: offsetX, y: offsetY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: REVEAL_DURATION_SECONDS, ease: 'easeOut', delay }}
    >
      {children}
    </MotionBlock>
  );
}

export default RevealOnScroll;
