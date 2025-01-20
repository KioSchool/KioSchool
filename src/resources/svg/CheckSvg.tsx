import * as React from 'react';

interface ChevronRightSvgProps extends React.SVGProps<SVGSVGElement> {}

const CheckSvg = (props: ChevronRightSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M16.8 8.40002L9.64043 15.6L7.19995 13.1457" stroke="black" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round" />
  </svg>
);
export default CheckSvg;
