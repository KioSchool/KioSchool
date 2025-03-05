import React from 'react';
import styled from '@emotion/styled';
import { tabletMediaQuery } from '@styles/globalStyles';

interface InfoLineGraphSvgProps extends React.SVGProps<SVGSVGElement> {}

const InfoLineGraphSvg = styled.svg`
  width: 661px;
  height: 480px;
  ${tabletMediaQuery} {
    width: 300px;
    height: 300px;
  }
`;

const AnimatedPath = styled.path`
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 10s linear infinite;

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    80% {
      stroke-dashoffset: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;

function AnimatedInfoLineGraphSvg(props: InfoLineGraphSvgProps) {
  return (
    <InfoLineGraphSvg viewBox="0 0 661 480" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <AnimatedPath d="M3 477L345 408 L446 192 L530 169 L658 3" stroke="#FFEBDC" strokeWidth="5" strokeLinecap="round" />
    </InfoLineGraphSvg>
  );
}

export default AnimatedInfoLineGraphSvg;
