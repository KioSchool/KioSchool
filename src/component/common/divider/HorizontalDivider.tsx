import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  opacity: 0.3;
`;

function HorizontalDivider() {
  return <Container />;
}

export default HorizontalDivider;
