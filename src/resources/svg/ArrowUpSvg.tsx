import * as React from 'react';

interface ArrowUpSvgProps extends React.SVGProps<SVGSVGElement> {}

const ArrowUpSvg = (props: ArrowUpSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width={25} height={25} viewBox="0 0 512.01 512.01" {...props}>
    <script />
    <path d="M505.755 358.256 271.088 123.589c-8.341-8.341-21.824-8.341-30.165 0L6.256 358.256c-8.341 8.341-8.341 21.824 0 30.165s21.824 8.341 30.165 0l219.584-219.584 219.584 219.584a21.275 21.275 0 0 0 15.083 6.251 21.275 21.275 0 0 0 15.083-6.251c8.341-8.341 8.341-21.824 0-30.165z" />
  </svg>
);
export default ArrowUpSvg;
