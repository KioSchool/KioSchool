import * as React from 'react';

interface CheckSvgProps extends React.SVGProps<SVGSVGElement> {}

const CheckSvg = (props: CheckSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 18 18" fill="none" {...props}>
    <path d="M12.8 5.4L6.64 12.6L4.2 10.1457" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CheckSvg;
