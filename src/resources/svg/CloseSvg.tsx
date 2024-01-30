import * as React from 'react';

interface CloseSvgProps extends React.SVGProps<SVGSVGElement> {}

const CloseSvg = (props: CloseSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="none" viewBox="0 0 24 24" {...props}>
    <script />
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16 16-4-4m0 0L8 8m4 4 4-4m-4 4-4 4" />
  </svg>
);
export default CloseSvg;
