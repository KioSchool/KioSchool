import * as React from 'react';

interface PreviewUpperTriangleSvgProps extends React.SVGProps<SVGSVGElement> {}

const PreviewUpperTriangleSvg = (props: PreviewUpperTriangleSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={8} height={7} fill="none" {...props}>
    <path fill="#5C5C5C" stroke="#5C5C5C" strokeLinejoin="round" strokeWidth={2} d="m4 1 3 5H1l3-5Z" />
  </svg>
);
export default PreviewUpperTriangleSvg;
