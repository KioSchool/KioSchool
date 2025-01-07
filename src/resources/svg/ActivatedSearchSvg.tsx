import * as React from 'react';

interface ActivatedSearchSvgProps extends React.SVGProps<SVGSVGElement> {}

const ActivatedSearchSvg = (props: ActivatedSearchSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none" {...props}>
    <circle cx="9" cy="9" r="8" stroke="#5C5C5C" strokeWidth="2" />
    <line x1="15.4142" y1="16" x2="21.5166" y2="22.1024" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export default ActivatedSearchSvg;
