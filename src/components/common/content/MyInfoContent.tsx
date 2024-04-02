import styled from '@emotion/styled';
import MyInfoItemContent from './MyInfoItemContent';

const MyInfoContainer = styled.div`
  width: 1100px;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: 0px 4px 16.8px 0px rgba(0, 0, 0, 0.25);
`;
const MyInfoSubContainer = styled.div`
  border: 2px solid black;
  width: 880px;
  height: 220px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 215px;
  background: #ccc;
`;

function MyInfoContent() {
  return (
    <>
      <MyInfoContainer>
        <MyInfoSubContainer>
          <MyInfoItemContent label="비밀번호 변경" />
          <VerticalLine />
          <MyInfoItemContent label="계좌관리" />
          <VerticalLine />
          <MyInfoItemContent label="계정탈퇴" />
        </MyInfoSubContainer>
      </MyInfoContainer>
    </>
  );
}

export default MyInfoContent;