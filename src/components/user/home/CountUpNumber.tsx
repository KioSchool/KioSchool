import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'framer-motion';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';

const Container = styled.div`
  padding: 0 32px;
  -webkit-font-smoothing: antialiased;
  word-break: keep-all;

  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    padding: 0 16px;
  }
`;

const NumberRow = styled.div<{ large: boolean; numberColor: string }>`
  font-size: ${({ large }) => (large ? '72px' : '52px')};
  font-weight: 800;
  color: ${({ numberColor }) => numberColor};
  letter-spacing: -0.04em;
  line-height: 1;
  white-space: nowrap;

  ${mobileMediaQuery} {
    font-size: ${({ large }) => (large ? '48px' : '36px')};
  }
`;

const Suffix = styled.span<{ large: boolean }>`
  font-size: ${({ large }) => (large ? '32px' : '24px')};
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: ${({ large }) => (large ? '22px' : '18px')};
  }
`;

const Label = styled.span`
  font-size: 15px;
  color: #adb1ba;
  margin-top: 8px;
`;

interface CountUpNumberProps {
  value: number;
  suffix: string;
  label: string;
  size?: 'default' | 'large';
  numberColor?: string;
  format?: (latest: number) => string;
}

function CountUpNumber({ value, suffix, label, size = 'default', numberColor = '#3C3530', format }: CountUpNumberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => (format ? format(latest) : latest.toLocaleString()));
  const isLarge = size === 'large';

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { type: 'spring', stiffness: 60, damping: 15 });
    }
  }, [isInView, motionValue, value]);

  return (
    <Container ref={ref}>
      <NumberRow large={isLarge} numberColor={numberColor}>
        <motion.span>{rounded}</motion.span> <Suffix large={isLarge}>{suffix}</Suffix>
      </NumberRow>
      {label && <Label>{label}</Label>}
    </Container>
  );
}

export default CountUpNumber;
