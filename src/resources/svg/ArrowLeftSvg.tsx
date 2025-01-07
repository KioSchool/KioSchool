import * as React from 'react';

interface ArrowLeftSvgProps extends React.SVGProps<SVGSVGElement> {}

const ArrowLeftSvg = (props: ArrowLeftSvgProps) => {
  const processedProps = { ...props };
  // this is a hack to remove the useBackIcon prop from the svg element
  // @ts-ignore
  delete processedProps.useBackIcon;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="none" {...processedProps}>
      <path d="M10.6663 19L3.99963 12M3.99963 12L10.6663 5M3.99963 12L19.9996 12" stroke="#5C5C5C" strokeWidth={2} />
    </svg>
  );
};
export default ArrowLeftSvg;
