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
    padding: 0 8px;
  }
`;

const NumberRow = styled.div<{ large: boolean; numberColor: string }>`
  font-size: ${({ large }) => (large ? '72px' : '52px')};
  font-weight: 800;
  color: ${({ numberColor }) => numberColor};
  letter-spacing: -0.04em;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;

  ${mobileMediaQuery} {
    font-size: ${({ large }) => (large ? '40px' : '28px')};
  }
`;

const Suffix = styled.span<{ large: boolean }>`
  font-size: ${({ large }) => (large ? '32px' : '24px')};
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
  letter-spacing: -0.02em;

  ${mobileMediaQuery} {
    font-size: ${({ large }) => (large ? '18px' : '14px')};
  }
`;

const Label = styled.span`
  font-size: 15px;
  color: #adb1ba;
  margin-top: 8px;

  ${mobileMediaQuery} {
    font-size: 13px;
    margin-top: 4px;
    text-align: center;
  }
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
  const rounded = useTransform(motionValue, (latest) => {
    const intValue = Math.round(latest);
    return format ? format(intValue) : intValue.toLocaleString();
  });
  const isLarge = size === 'large';

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5, ease: 'easeOut' });
    }
  }, [isInView, motionValue, value]);

  return (
    <Container ref={ref}>
      <NumberRow large={isLarge} numberColor={numberColor}>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          {/* 최종적으로 도달할 숫자를 투명하게 렌더링해서 영역(너비)을 미리 확보해 둠 */}
          <span style={{ visibility: 'hidden' }}>{format ? format(value) : value.toLocaleString()}</span>
          {/* 애니메이션 숫자는 확보된 영역 위에서 우측 정렬로 커짐 */}
          <motion.span style={{ position: 'absolute', right: 0, top: 0 }}>{rounded}</motion.span>
        </span>{' '}
        <Suffix large={isLarge}>{suffix}</Suffix>
      </NumberRow>
      {label && <Label>{label}</Label>}
    </Container>
  );
}

export default CountUpNumber;
