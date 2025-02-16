import * as React from 'react';

interface ChevronRightSvgProps extends React.SVGProps<SVGSVGElement> {}

const ChevronRightSvg = (props: ChevronRightSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={14} viewBox="0 0 8 14" fill="none" {...props}>
    <path d="M1 1L7 7L1 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default ChevronRightSvg;
