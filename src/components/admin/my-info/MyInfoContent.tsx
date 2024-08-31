import styled from '@emotion/styled';
import MyInfoItemContent from './MyInfoItemContent';
import { useNavigate } from 'react-router-dom';
import AccountIconSvg from '@resources/svg/AccountIconSvg';
import DeleteUserSvg from '@resources/svg/DeleteUserSvg';
import useConfirm from '@hooks/useConfirm';
import React from 'react';
import useAdminUser from '@hooks/admin/useAdminUser';
import AppFooter from '@components/common/footer/AppFooter';
import { rowFlex } from '@styles/flexStyles';

const MyInfoContainer = styled.div`
  width: 1100px;
  height: 300px;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  box-shadow: 0 4px 16.8px 0 rgba(0, 0, 0, 0.25);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const MyInfoSubContainer = styled.div`
  width: 100%;
  height: 220px;
  ${rowFlex({ justify: 'space-evenly', align: 'center' })}
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 215px;
  background: #ccc;
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
  const { deleteUser } = useAdminUser();

  const { ConfirmModal: DeleteUserConfirmModal, confirm: deleteUserConfirm } = useConfirm(
    '계정을 탈퇴하시겠습니까?',
    '확인 후 되돌릴 수 없습니다.',
    '확인',
    '취소',
  );

  const deleteUserHandler = async () => {
    const userInput = await deleteUserConfirm();
    if (userInput) deleteUser();
  };

  return (
    <MyInfoContainer className={'my-info-container'}>
      <MyInfoSubContainer className={'my-info-sub-container'}>
        <MyInfoItemContent label="계좌관리">
          <AccountButton onClick={() => navigate('/admin/register-account')} />
        </MyInfoItemContent>

        <VerticalLine />

        <MyInfoItemContent label="계정탈퇴">
          <DeleteUserButton onClick={deleteUserHandler} />
        </MyInfoItemContent>
      </MyInfoSubContainer>
      <DeleteUserConfirmModal />
      <AppFooter />
    </MyInfoContainer>
  );
}

export default MyInfoContent;
