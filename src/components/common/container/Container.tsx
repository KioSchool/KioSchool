import styled from '@emotion/styled';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
`;

export const SubContainer = styled.div<{ justifyValue: string; flexDirection?: string; alignItems?: string }>`
  display: flex;
  width: 65vw;
  flex-basis: 0;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'center')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  height: 500px;
  min-width: 1100px;
  justify-content: ${(props) => props.justifyValue};
`;

interface Props {
  children: JSX.Element;
  justifyValue: string;
  flexDirection?: string;
  alignItems?: string;
}

function Container({ children, justifyValue, flexDirection, alignItems }: Props) {
  return (
    <MainContainer>
      <SubContainer justifyValue={justifyValue} flexDirection={flexDirection} alignItems={alignItems}>
        {children}
      </SubContainer>
    </MainContainer>
  );
}

export default Container;
