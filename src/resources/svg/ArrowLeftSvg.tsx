import * as React from 'react';

interface ArrowLeftSvgProps extends React.SVGProps<SVGSVGElement> {}

const ArrowLeftSvg = (props: ArrowLeftSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M17.78 31.667 6.667 20m0 0L17.779 8.334M6.668 20h26.667" />
  </svg>
);
export default ArrowLeftSvg;
