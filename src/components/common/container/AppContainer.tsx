import styled from '@emotion/styled';
import NavBar from '../nav/NavBar';

export const MainContainer = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'white')};
`;

export const SubContainer = styled.div<{ justifyValue: string; flexDirection?: string; alignItems?: string }>`
  display: flex;
  width: 65vw;
  flex-basis: 0;
  flex-wrap: wrap;
  flex-direction: ${(props) => props.flexDirection || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  height: 100%;
  min-width: 1100px;
  justify-content: ${(props) => props.justifyValue};
`;

interface Props {
  children: JSX.Element;
  justifyValue: string;
  flexDirection?: string;
  alignItems?: string;
  backgroundColor?: string;
  useNavBackground?: boolean;
}

function AppContainer({ children, justifyValue, flexDirection, alignItems, backgroundColor, useNavBackground }: Props) {
  return (
    <MainContainer backgroundColor={backgroundColor}>
      <NavBar useBackground={useNavBackground} />
      <SubContainer justifyValue={justifyValue} flexDirection={flexDirection} alignItems={alignItems}>
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
