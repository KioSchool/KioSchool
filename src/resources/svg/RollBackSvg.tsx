import * as React from 'react';

interface RollBackSvgProps extends React.SVGProps<SVGSVGElement> {}

const RollBackSvg = (props: RollBackSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none" {...props}>
    <path
      d="M1.49002 6.90625C2.06264 8.70284 3.70261 10 5.63636 10C8.04633 10 10 7.98528 10 5.5C10 3.01472 8.04633 1 5.63636 1C4.0212 1 2.611 1.90495 1.8565 3.25M3.18182 3.8125H1V1.5625"
      stroke="black"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default RollBackSvg;
