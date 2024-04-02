import styled from '@emotion/styled';
import MyInfoItemContent from './MyInfoItemContent';
import { useNavigate } from 'react-router-dom';

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
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 215px;
  background: #ccc;
`;

function MyInfoContent() {
  const navigate = useNavigate();
  const onClickHandler = (url: string) => {
    navigate(url);
  };
  return (
    <MyInfoContainer>
      <MyInfoSubContainer>
        <MyInfoItemContent label="비밀번호 변경" onClickFunc={onClickHandler} iconString="setting" />
        <VerticalLine />
        <MyInfoItemContent label="계좌관리" onClickFunc={onClickHandler} iconString="account" />
        <VerticalLine />
        <MyInfoItemContent label="계정탈퇴" onClickFunc={onClickHandler} iconString="delete" />
      </MyInfoSubContainer>
    </MyInfoContainer>
  );
}

export default MyInfoContent;
