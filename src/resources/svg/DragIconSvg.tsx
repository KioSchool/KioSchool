import * as React from 'react';

interface DragIconSvgProps extends React.SVGProps<SVGSVGElement> {}

const DragIconSvg = (props: DragIconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path d="M16.6654 15H3.33203M16.6654 10H3.33203M16.6654 5H3.33203" stroke="black" strokeOpacity="0.3" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
export default DragIconSvg;
