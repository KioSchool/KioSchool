import { Color } from '@resources/colors';

export const navBarLabelStyle = `
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: ${Color.grey};
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: ${Color.kioOrange};
    text-decoration: underline;
  }`;
