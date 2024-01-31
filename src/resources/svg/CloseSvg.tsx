import * as React from 'react';

interface CloseSvgProps extends React.SVGProps<SVGSVGElement> {}

const CloseSvg = (props: CloseSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path stroke="#000" strokeLinecap="round" strokeWidth={2} d="M15.916 3.183 3.183 15.916m12.733 0L3.183 3.183" />
  </svg>
);
export default CloseSvg;
