import * as React from 'react';

interface CloseSvgProps extends React.SVGProps<SVGSVGElement> {}

const DeleteButton = (props: CloseSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <path
      d="M5 7.72059H25M11.25 3.75H18.75M12.5 20.9559V13.0147M17.5 20.9559V13.0147M19.375 26.25H10.625C9.24429 26.25 8.125 25.0649 8.125 23.6029L7.55425 9.09922C7.52466 8.34729 8.09239 7.72059 8.80317 7.72059H21.1968C21.9076 7.72059 22.4753 8.34729 22.4457 9.09922L21.875 23.6029C21.875 25.0649 20.7557 26.25 19.375 26.25Z"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default DeleteButton;
