import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import CellularConnectionSvg from '@resources/svg/preview/CellularConnectionSvg';
import WifiSvg from '@resources/svg/preview/WifiSvg';
import BatterySvg from '@resources/svg/preview/BatterySvg';
import PreviewUpperTriangleSvg from '@resources/svg/preview/PreviewUpperTriangleSvg';
import AppLabel from '@components/common/label/AppLabel';

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
  padding-top: 20px;
  border-radius: 28px;
  box-shadow: 1px 10px 40px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const IndicatorContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
`;

const LeftIndicatorContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 3px;
`;

const RightIndicatorContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 3px;
`;

const FooterContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  width: 100%;
  height: 30px;
  font-size: 15px;
  color: ${Color.GREY};
  gap: 10px;
`;

function PreviewContainer({ children, width = 280, height = 630 }: PreviewContainerProps) {
  return (
    <Container width={width} height={height}>
      <DeviceContainer width={width} height={height}>
        <IndicatorContainer>
          <LeftIndicatorContainer>
            <AppLabel size={15} color={Color.BLACK}>
              10:15
            </AppLabel>
          </LeftIndicatorContainer>
          <RightIndicatorContainer>
            <CellularConnectionSvg />
            <WifiSvg />
            <BatterySvg />
          </RightIndicatorContainer>
        </IndicatorContainer>
        {children}
      </DeviceContainer>
      <FooterContainer>
        <PreviewUpperTriangleSvg />
        주문화면 미리보기
      </FooterContainer>
    </Container>
  );
}

export default PreviewContainer;
