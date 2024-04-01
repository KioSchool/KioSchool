import styled from '@emotion/styled';

const MyInfoContainer = styled.div`
  width: 1100px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 16.8px 0px rgba(0, 0, 0, 0.25);
`;

function MyInfoContent() {
  return (
    <>
      <MyInfoContainer></MyInfoContainer>
    </>
  );
}

export default MyInfoContent;
