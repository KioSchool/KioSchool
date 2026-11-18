import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

const COUNT_UP_DURATION_SECONDS = 1.5;

interface CountUpValueProps {
  value: number;
  format?: (latest: number) => string;
  className?: string;
}

function CountUpValue({ value, format, className }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const displayed = useTransform(motionValue, (latest) => {
    const rounded = Math.round(latest);
    if (format) return format(rounded);
    return rounded.toLocaleString();
  });

  useEffect(() => {
    if (!isInView) return;
    animate(motionValue, value, { duration: COUNT_UP_DURATION_SECONDS, ease: 'easeOut' });
  }, [isInView, motionValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {displayed}
    </motion.span>
  );
}

export default CountUpValue;
