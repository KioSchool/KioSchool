import * as React from 'react';

interface PlusButtonSvgProps extends React.SVGProps<SVGSVGElement> {}

const PlusButtonSvg = (props: PlusButtonSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g clipPath="url(#a)">
      <circle cx={12} cy={12} r={12} fill="#000" />
      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m-5-5h10" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default PlusButtonSvg;
