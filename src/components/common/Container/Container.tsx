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
  justify-content: ${(props) => props.justifyValue};
`;

const Container = (props: any) => {
  return (
    <>
      <MainContainer>
        <SubContainer justifyValue={props.justifyValue}>{props.content}</SubContainer>
      </MainContainer>
    </>
  );
};

export default Container;
