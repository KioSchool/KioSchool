import styled from '@emotion/styled';
import NavBar from '@components/common/nav/NavBar';
import { colFlex, rowFlex } from '@styles/flexStyles';
import TitleNavBar, { TitleNavBarProps } from '../nav/TitleNavBar';
import { SerializedStyles } from '@emotion/react';

export const MainContainer = styled.div<{ backgroundColor?: string; useScroll?: boolean }>`
  width: 100%;
  height: ${(props) => (props.useScroll ? '100%' : '100vh')};
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'white')};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

export const SubContainer = styled.div<{
  useFlex: SerializedStyles;
  customWidth?: string;
  customHeight?: string;
  customGap?: string;
  isTitleNavBar?: boolean;
}>`
  flex-basis: 0;
  flex-wrap: wrap;
  width: ${(props) => props.customWidth || '65vw'};
  height: ${(props) => props.customHeight || '100%'};
  min-width: 1000px;
  padding-top: ${(props) => props.isTitleNavBar && '140px'};

  gap: ${(props) => props.customGap};
  ${(props) => props.useFlex}
`;

interface Props {
  children: JSX.Element;
  useFlex: SerializedStyles;
  backgroundColor?: string;
  useNavBackground?: boolean;
  customWidth?: string;
  customHeight?: string;
  customGap?: string;
  titleNavBarProps?: TitleNavBarProps;
  useScroll?: boolean;
}

function TestContainer({ children, useFlex, backgroundColor, useNavBackground, customWidth, customHeight, customGap, titleNavBarProps, useScroll }: Props) {
  return (
    <MainContainer backgroundColor={backgroundColor} className={'main-container'} useScroll={useScroll}>
      <NavBar useBackground={useNavBackground} />
      {titleNavBarProps && <TitleNavBar {...titleNavBarProps} />}
      <SubContainer
        useFlex={useFlex}
        customWidth={customWidth}
        customHeight={customHeight}
        customGap={customGap}
        className={'sub-container'}
        isTitleNavBar={!!titleNavBarProps}
      >
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default TestContainer;
