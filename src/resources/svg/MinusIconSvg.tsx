import * as React from 'react';

interface MinusIconSvgProps extends React.SVGProps<SVGSVGElement> {}

const MinusIconSvg = (props: MinusIconSvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none" {...props}>
      <path d="M1 1H11" stroke="#EB6D09" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default MinusIconSvg;
