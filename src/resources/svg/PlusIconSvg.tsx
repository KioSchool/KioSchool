import * as React from 'react';

interface PlusIconSvgProps extends React.SVGProps<SVGSVGElement> {}

const PlusIconSvg = (props: PlusIconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={51} height={51} viewBox="0 0 51 51" fill="none" {...props}>
    <g filter="url(#filter0_d_1357_1404)">
      <path d="M25.5 10.2L25.5 40.8M40.8 25.4999L10.2 25.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_d_1357_1404" x="-6" y="-4" width="63" height="63" filterUnits="userSpaceOnUse" colorInterpolation-filters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1357_1404" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1357_1404" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default PlusIconSvg;
