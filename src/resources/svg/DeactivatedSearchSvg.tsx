import * as React from 'react';

interface DeactivatedSearchSvgProps extends React.SVGProps<SVGSVGElement> {}

const DeactivatedSearchSvg = (props: DeactivatedSearchSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none" {...props}>
    <circle cx="9" cy="9" r="8.25" stroke="#D8D8D8" strokeWidth="1.5" />
    <line x1="15.0607" y1="16" x2="21.5166" y2="22.456" stroke="#D9D9D9" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export default DeactivatedSearchSvg;
