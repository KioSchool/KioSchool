import * as React from 'react';

interface ShareSvgProps extends React.SVGProps<SVGSVGElement> {}

const ShareSvg = (props: ShareSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={'20'} height={'16'} viewBox={'0 0 20 16'} fill={'none'} {...props}>
    <path
      d="M19.0002 7.35902L9.40019 1L9.40019 4.6C1 6.4 1 14.8 1 14.8C1 14.8 4.6 10 9.40019 10.6L9.40019 14.32L19.0002 7.35902Z"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);
export default ShareSvg;
