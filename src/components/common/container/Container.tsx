import styled from '@emotion/styled';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
`;

export const SubContainer = styled.div<{ justifyValue: string }>`
  display: flex;
  width: 60vw;
  flex-basis: 0;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  height: 500px;
  min-width: 1100px;
  justify-content: ${(props) => props.justifyValue};
`;

interface Props {
  children: JSX.Element;
  justifyValue: string;
}

function Container({ children, justifyValue }: Props) {
  return (
    <MainContainer>
      <SubContainer justifyValue={justifyValue}>{children}</SubContainer>
    </MainContainer>
  );
}

export default Container;
