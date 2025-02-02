import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

interface PreviewContainerProps {
  children: JSX.Element;
  width?: number;
  height?: number;
}

const Container = styled.div<{ width: number; height: number }>`
  ${colFlex({ justify: 'center', align: 'center' })}
  width: ${(props) => props.width}px;
  height: ${(props) => props.height + 30}px;
  gap: 25px;
`;

const DeviceContainer = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 28px;
  box-shadow: 1px 10px 40px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const IndicatorContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 30px;
`;

const FooterContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 30px;
  font-size: 15px;
  color: ${Color.GREY};
`;

function PreviewContainer({ children, width = 360, height = 700 }: PreviewContainerProps) {
  return (
    <Container width={width} height={height}>
      <DeviceContainer width={width} height={height}>
        <IndicatorContainer />
        {children}
      </DeviceContainer>
      <FooterContainer>주문화면 미리보기</FooterContainer>
    </Container>
  );
}

export default PreviewContainer;
