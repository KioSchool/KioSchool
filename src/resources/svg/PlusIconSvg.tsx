import * as React from 'react';

interface PlusIconSvgProps extends React.SVGProps<SVGSVGElement> {}

const PlusIconSvg = (props: PlusIconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={800} height={800} fill="none" viewBox="0 0 24 24" {...props}>
    <script />
    <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12m-6-6v12" />
  </svg>
);
export default PlusIconSvg;
