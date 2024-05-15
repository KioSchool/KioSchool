import styled from '@emotion/styled';
import NavBar from '../nav/NavBar';

export const MainContainer = styled.div<{ backgroundColor?: string }>`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : 'white')};
`;

export const SubContainer = styled.div<{ justifyValue: string; flexDirection?: string; alignItems?: string; fullWidth?: boolean }>`
  display: flex;
  width: ${(props) => (props.fullWidth ? '100vw' : '65vw')};
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
  fullWidth?: boolean;
}

function AppContainer({ children, justifyValue, flexDirection, alignItems, backgroundColor, useNavBackground, fullWidth }: Props) {
  return (
    <MainContainer backgroundColor={backgroundColor}>
      <NavBar useBackground={useNavBackground} />
      <SubContainer justifyValue={justifyValue} flexDirection={flexDirection} alignItems={alignItems} fullWidth={fullWidth}>
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default AppContainer;
