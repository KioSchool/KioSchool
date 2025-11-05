import { Color } from '@resources/colors';

export const navBarLabelStyle = `
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
  color: ${Color.GREY};
  font-family: 'LINE Seed Sans KR';
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }`;
