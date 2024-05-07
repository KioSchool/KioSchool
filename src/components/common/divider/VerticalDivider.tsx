import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 100%;
  width: 1px;
  background-color: gray;
  opacity: 0.3;
`;

function VerticalDivider() {
  return <Container />;
}

export default VerticalDivider;
