import * as React from 'react';

interface DeleteButtonGraySvgProps extends React.SVGProps<SVGSVGElement> {}

const DeleteButtonGraySvg = (props: DeleteButtonGraySvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <g filter="url(#filter0_d_670_1061)">
      <path
        d="M5.33203 5.14706H18.6654M9.4987 2.5H14.4987M10.332 13.9706V8.67647M13.6654 13.9706V8.67647M14.9154 17.5H9.08203C8.16156 17.5 7.41536 16.7099 7.41536 15.7353L7.03487 6.06614C7.01514 5.56486 7.39363 5.14706 7.86748 5.14706H16.1299C16.6038 5.14706 16.9823 5.56486 16.9625 6.06614L16.582 15.7353C16.582 16.7099 15.8358 17.5 14.9154 17.5Z"
        stroke="#A4A4A4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter id="filter0_d_670_1061" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_670_1061" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_670_1061" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default DeleteButtonGraySvg;
