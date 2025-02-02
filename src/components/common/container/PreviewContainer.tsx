import React from 'react';
import styled from '@emotion/styled';

interface PreviewContainerProps {
  children: JSX.Element;
  width?: number;
  height?: number;
}

const Container = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 28px;
  box-shadow: 1px 10px 40px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

function PreviewContainer({ children, width = 360, height = 700 }: PreviewContainerProps) {
  return (
    <Container width={width} height={height}>
      {children}
    </Container>
  );
}

export default PreviewContainer;
