import styled from '@emotion/styled';
import NavBar from '@components/common/nav/NavBar';

export const MainContainer = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'white')};
`;

export const SubContainer = styled.div<{
  justifyValue: string;
  flexDirection?: string;
  alignItems?: string;
  customWidth?: string;
  customHeight?: string;
  customGap?: string;
}>`
  display: flex;
  width: ${(props) => props.customWidth || '65vw'};
  flex-basis: 0;
  flex-wrap: wrap;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  align-items: ${(props) => props.alignItems || 'center'};
  height: ${(props) => props.customHeight || '100%'};
  min-width: 1000px;
  justify-content: ${(props) => props.justifyValue};
  gap: ${(props) => props.customGap};
`;

interface Props {
  children: JSX.Element;
  justifyValue: string;
  flexDirection?: string;
  alignItems?: string;
  backgroundColor?: string;
  useNavBackground?: boolean;
  customWidth?: string;
  customHeight?: string;
  customGap?: string;
}

function AppContainer({ children, justifyValue, flexDirection, alignItems, backgroundColor, useNavBackground, customWidth, customHeight, customGap }: Props) {
  return (
    <MainContainer backgroundColor={backgroundColor}>
      <NavBar useBackground={useNavBackground} />
      <SubContainer
        justifyValue={justifyValue}
        flexDirection={flexDirection}
        alignItems={alignItems}
        customWidth={customWidth}
        customHeight={customHeight}
        customGap={customGap}
      >
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
