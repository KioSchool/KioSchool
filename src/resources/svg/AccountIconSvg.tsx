import * as React from 'react';

interface AccountIconSvgProps extends React.SVGProps<SVGSVGElement> {}

const AccountIconSvg = (props: AccountIconSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" {...props}>
    <g>
      <path
        d="M512 163v-27c0-30.928-25.072-56-56-56H56c-30.928 0-56 25.072-56 56v27a5 5 0 0 0 5 5h502a5 5 0 0 0 5-5zM0 205v171c0 30.928 25.072 56 56 56h400c30.928 0 56-25.072 56-56V205a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5zm128 131c0 8.836-7.164 16-16 16H96c-8.836 0-16-7.164-16-16v-16c0-8.836 7.164-16 16-16h16c8.836 0 16 7.164 16 16z"
        fill="#eb6d09"
        opacity="1"
      ></path>
    </g>
  </svg>
);
export default AccountIconSvg;
