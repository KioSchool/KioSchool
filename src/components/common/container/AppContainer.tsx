import styled from '@emotion/styled';
import NavBar from '@components/common/nav/NavBar';
import { colFlex, rowFlex } from '@styles/flexStyles';
import TitleNavBar, { TitleNavBarProps } from '../nav/TitleNavBar';

export const MainContainer = styled.div<{ backgroundColor?: string; useScroll?: boolean }>`
  width: 100%;
  height: ${(props) => (props.useScroll ? '100%' : '100vh')};
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'white')};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

export const SubContainer = styled.div<{
  contentsJustify: string;
  contentsDirection?: string;
  contentsAlign?: string;
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
  gap: ${(props) => props.customGap};
  ${(props) =>
    props.contentsDirection === 'row'
      ? rowFlex({ justify: props.contentsJustify, align: props.contentsAlign || 'center' })
      : colFlex({ justify: props.contentsJustify, align: props.contentsAlign || 'center' })}
`;

interface Props {
  children: JSX.Element;
  contentsJustify: string;
  contentsDirection?: string;
  contentsAlign?: string;
  backgroundColor?: string;
  useNavBackground?: boolean;
  customWidth?: string;
  customHeight?: string;
  customGap?: string;
  useTitleNavBar?: TitleNavBarProps;
  useScroll?: boolean;
}

function AppContainer({
  children,
  contentsJustify,
  contentsDirection,
  contentsAlign,
  backgroundColor,
  useNavBackground,
  customWidth,
  customHeight,
  customGap,
  useTitleNavBar,
  useScroll,
}: Props) {
  return (
    <MainContainer backgroundColor={backgroundColor} className={'main-container'} useScroll={useScroll}>
      <NavBar useBackground={useNavBackground} />
      {useTitleNavBar && <TitleNavBar {...useTitleNavBar} />}
      <SubContainer
        contentsJustify={contentsJustify}
        contentsDirection={contentsDirection}
        contentsAlign={contentsAlign}
        customWidth={customWidth}
        customHeight={customHeight}
        customGap={customGap}
        className={'sub-container'}
        isTitleNavBar={!!useTitleNavBar}
      >
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
