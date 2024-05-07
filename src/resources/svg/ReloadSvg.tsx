import * as React from 'react';

interface ReloadSvgProps extends React.SVGProps<SVGSVGElement> {}

const ReloadSvg = (props: ReloadSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width={40} height={40} viewBox="0 0 489.533 489.533" {...props}>
    <script />
    <path d="M268.175 488.161c98.2-11 176.9-89.5 188.1-187.7 14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9l-118.6 87.1c-2 1.5-2 4.4 0 5.9l118.6 87.1c2.7 2 6.7.2 6.7-2.9v-57.5c87.9 1.4 158.3 76.2 152.3 165.6-5.1 76.9-67.8 139.3-144.7 144.2-81.5 5.2-150.8-53-163.2-130-2.3-14.3-14.8-24.7-29.2-24.7-17.9 0-31.9 15.9-29.1 33.6 17.4 109.7 118.7 192 236 178.9z" />
  </svg>
);
export default ReloadSvg;
