import styled from '@emotion/styled';
import MyInfoItemContent from './MyInfoItemContent';
import SettingSvg from '@resources/svg/SettingIconSvg';
import { useNavigate } from 'react-router-dom';
import AccountIconSvg from '@resources/svg/AccountIconSvg';
import DeleteUserSvg from '@resources/svg/DeleteUserSvg';
import useConfirm from '@hooks/useConfirm';
import React from 'react';

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
  const { ConfirmModal: ChangePasswordConfirmModal, confirm: changePasswordConfirm } = useConfirm(
    '등록하신 메일로 재설정 이메일을 보내시겠습니까?',
    '',
    '확인',
    '취소',
  );

  const { ConfirmModal: DeleteUserConfirmModal, confirm: deleteUserConfirm } = useConfirm(
    '계정을 탈퇴하시겠습니까?',
    '확인 후 되돌릴 수 없습니다.',
    '확인',
    '취소',
  );

  const changePassword = async () => {
    const userInput = await changePasswordConfirm();
    if (userInput) return;
  };

  const deleteUser = async () => {
    const userInput = await deleteUserConfirm();
    if (userInput) return;
  };

  return (
    <MyInfoContainer>
      <MyInfoSubContainer>
        <MyInfoItemContent label="비밀번호 변경">
          <SettingButton onClick={changePassword} />
        </MyInfoItemContent>

        <VerticalLine />

        <MyInfoItemContent label="계좌관리">
          <AccountButton onClick={() => navigate('/admin/register-account')} />
        </MyInfoItemContent>

        <VerticalLine />

        <MyInfoItemContent label="계정탈퇴">
          <DeleteUserButton onClick={deleteUser} />
        </MyInfoItemContent>
      </MyInfoSubContainer>
      <ChangePasswordConfirmModal />
      <DeleteUserConfirmModal />
    </MyInfoContainer>
  );
}

export default MyInfoContent;
