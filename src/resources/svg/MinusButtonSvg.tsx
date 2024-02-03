import * as React from 'react';

interface MinusButtonSvgProps extends React.SVGProps<SVGSVGElement> {}

const MinusButtonSvg = (props: MinusButtonSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g stroke="#000" clipPath="url(#a)">
      <circle cx={12} cy={12} r={11.5} fill="#fff" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default MinusButtonSvg;
