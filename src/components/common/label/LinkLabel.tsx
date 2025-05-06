import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const StyledLink = styled.a`
  color: #999;
  text-decoration: none;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-color: #999;

  text-decoration-thickness: 5.5%;
  text-underline-offset: 2.1px;
  text-underline-position: from-font;
  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration-color: ${Color.KIO_ORANGE};
  }
`;

interface LinkLabelProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
  href: string;
}

function LinkLabel(props: LinkLabelProps) {
  return (
    <StyledLink {...props} href={props.href}>
      {props.text}
    </StyledLink>
  );
}

export default LinkLabel;
