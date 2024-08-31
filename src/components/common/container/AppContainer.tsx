import styled from '@emotion/styled';
import NavBar from '@components/common/nav/NavBar';
import { colFlex, rowFlex } from '@styles/flexStyles';

export const MainContainer = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: 100vh;
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
}: Props) {
  return (
    <MainContainer backgroundColor={backgroundColor} className={'main-container'}>
      <NavBar useBackground={useNavBackground} />
      <SubContainer
        contentsJustify={contentsJustify}
        contentsDirection={contentsDirection}
        contentsAlign={contentsAlign}
        customWidth={customWidth}
        customHeight={customHeight}
        customGap={customGap}
        className={'sub-container'}
      >
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
