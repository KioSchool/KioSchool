import * as React from 'react';

interface CellularConnectionSvgProps extends React.SVGProps<SVGSVGElement> {}

const CellularConnectionSvg = (props: CellularConnectionSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={15} height={10} fill="none" {...props}>
    <g fill="#000">
      <rect width={2.555} height={3.198} x={0.83} y={5.83} rx={1.277} />
      <rect width={2.555} height={4.478} x={4.662} y={4.551} rx={1.277} />
      <rect width={2.555} height={6.397} x={8.494} y={2.631} rx={1.277} />
      <rect width={2.555} height={8.316} x={12.326} y={0.712} rx={1.277} />
    </g>
  </svg>
);
export default CellularConnectionSvg;
