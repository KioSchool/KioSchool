import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Color.GREY};
  opacity: 0.3;
`;

function HorizontalDivider() {
  return <Container />;
}

export default HorizontalDivider;
