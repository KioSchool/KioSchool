import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Color } from '@resources/colors';
import { useEffect, useState } from 'react';
import { TIP_DURATION } from '@constants/data/orderWaitData';

const tipFade = keyframes`
  0% { opacity: 0; transform: translateY(4px); }
  15% { opacity: 1; transform: translateY(0); }
  85% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-4px); }
`;

const Banner = styled.div`
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  word-break: keep-all;
  color: ${Color.KIO_ORANGE};
  background-color: #fff3e0;
`;

const FadeText = styled.span`
  animation: ${tipFade} ${TIP_DURATION}ms ease-in-out;
`;

interface OrderWaitTipBannerProps {
  tips: readonly string[];
}

function OrderWaitTipBanner({ tips }: OrderWaitTipBannerProps) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, TIP_DURATION);

    return () => clearInterval(intervalId);
  }, [tips.length]);

  return (
    <Banner>
      <FadeText key={tipIndex}>{tips[tipIndex]}</FadeText>
    </Banner>
  );
}

export default OrderWaitTipBanner;
