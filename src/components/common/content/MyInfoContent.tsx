import styled from '@emotion/styled';
import MyInfoItemContent from './MyInfoItemContent';
import SettingSvg from '@resources/svg/SettingIconSvg';
import { useNavigate } from 'react-router-dom';
import AccountIconSvg from '@resources/svg/AccountIconSvg';
import DeleteUserSvg from '@resources/svg/DeleteUserSvg';

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

const SettingButton = styled(SettingSvg)`
  cursor: pointer;
  position: absolute;
  width: 70px;
  height: 70px;
  right: 44px;
  left: 44px;
  top: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const AccountButton = styled(AccountIconSvg)`
  cursor: pointer;
  position: absolute;
  width: 70px;
  height: 70px;
  right: 44px;
  left: 44px;
  top: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const DeleteUserButton = styled(DeleteUserSvg)`
  cursor: pointer;
  position: absolute;
  width: 70px;
  height: 70px;
  right: 44px;
  left: 44px;
  top: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

function MyInfoContent() {
  const navigate = useNavigate();

  return (
    <MyInfoContainer>
      <MyInfoSubContainer>
        <MyInfoItemContent label="비밀번호 변경">
          <SettingButton onClick={() => navigate('/change-password')} />
        </MyInfoItemContent>

        <VerticalLine />

        <MyInfoItemContent label="계좌관리">
          <AccountButton onClick={() => navigate('/register-account')} />
        </MyInfoItemContent>

        <VerticalLine />

        <MyInfoItemContent label="계정탈퇴">
          <DeleteUserButton onClick={() => navigate('/delete-user')} />
        </MyInfoItemContent>
      </MyInfoSubContainer>
    </MyInfoContainer>
  );
}

export default MyInfoContent;
