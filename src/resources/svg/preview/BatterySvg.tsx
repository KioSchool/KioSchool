import * as React from 'react';

interface BatterySvgProps extends React.SVGProps<SVGSVGElement> {}

const BatterySvg = (props: BatterySvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={10} fill="none" {...props}>
    <rect width={14.967} height={7.955} x={1.18} y={1.212} stroke="#000" opacity={0.35} rx={3} />
    <rect width={13.412} height={6.397} x={1.957} y={1.992} fill="#000" rx={3} />
    <path fill="#000" d="M17.285 3.91s1.277.257 1.277 1.28c0 1.023-1.277 1.28-1.277 1.28V3.91Z" opacity={0.35} />
  </svg>
);
export default BatterySvg;
