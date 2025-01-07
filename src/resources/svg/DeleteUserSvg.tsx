import * as React from 'react';

interface DeleteUserSvgProps extends React.SVGProps<SVGSVGElement> {}

const DeleteUserSvg = (props: DeleteUserSvgProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="512" height="512" viewBox="0 0 512 512" {...props}>
    <g>
      <path
        fillRule="evenodd"
        d="M252.326 430.455v25.516c0 20.462-10.198 38.127-27.919 48.357-8.526 4.922-18.042 7.668-27.908 7.673-9.875.005-19.388-2.746-27.92-7.673L55.123 438.824c-17.723-10.232-27.919-27.892-27.919-48.357V55.838C27.204 25.047 52.252 0 83.042 0h249.871c30.792 0 55.842 25.045 55.842 55.838v70.539c0 10.119-8.216 18.335-18.335 18.335-10.122 0-18.331-8.215-18.331-18.335V55.838c0-10.573-8.603-19.176-19.176-19.176H113.961l110.446 63.777c17.715 10.23 27.919 27.89 27.919 48.347v245.003h80.587c10.572 0 19.176-8.598 19.176-19.172v-61.836c0-10.126 8.204-18.335 18.331-18.335 10.123 0 18.335 8.211 18.335 18.335v61.836c0 30.793-25.05 55.838-55.842 55.838zm169.883-196.897-20.191 20.191c-7.159 7.159-7.157 18.765 0 25.925a18.28 18.28 0 0 0 12.963 5.364 18.27 18.27 0 0 0 12.968-5.364l51.479-51.488c7.157-7.158 7.158-18.758 0-25.916l-51.479-51.48c-7.16-7.16-18.767-7.157-25.93-.001-7.157 7.152-7.155 18.763 0 25.917l20.19 20.186h-135.26c-10.129 0-18.331 8.208-18.331 18.336s8.203 18.331 18.331 18.331h135.26z"
        clipRule="evenodd"
        fill="#eb6d09"
        opacity="1"
      ></path>
    </g>
  </svg>
);
export default DeleteUserSvg;
