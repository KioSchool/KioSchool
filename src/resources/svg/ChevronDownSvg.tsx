import * as React from 'react';

interface ChevronDownSvgProps extends React.SVGProps<SVGSVGElement> {}

const ChevronDownSvg = (props: ChevronDownSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
    <path d="M4 7L9.00081 11.58L14 7" stroke="#0A090B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default ChevronDownSvg;
