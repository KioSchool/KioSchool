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
import { adminUserAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';
import SuperAdminSvg from '@resources/svg/SuperAdminSvg';
import { UserRole } from '@@types/index';

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

const CommonButtonStyle = `
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

const SuperAdminButton = styled(SuperAdminSvg)`
  ${CommonButtonStyle};
`;

const AccountButton = styled(AccountIconSvg)`
  ${CommonButtonStyle};
`;

const DeleteUserButton = styled(DeleteUserSvg)`
  ${CommonButtonStyle};
`;

function MyInfoContent() {
  const navigate = useNavigate();
  const { deleteUser } = useAdminUser();
  const user = useRecoilValue(adminUserAtom);

  const { ConfirmModal: DeleteUserConfirmModal, confirm: deleteUserConfirm } = useConfirm({
    title: '계정을 탈퇴하시겠습니까?',
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '확인',
    cancelText: '취소',
  });

  const deleteUserHandler = async () => {
    const userInput = await deleteUserConfirm();
    if (userInput) deleteUser();
  };

  return (
    <MyInfoContainer className={'my-info-container'}>
      <MyInfoSubContainer className={'my-info-sub-container'}>
        {user.role === UserRole.SUPER_ADMIN && (
          <>
            <MyInfoItemContent label="SUPER ADMIN">
              <SuperAdminButton onClick={() => navigate('/super-admin')} />
            </MyInfoItemContent>

            <VerticalLine />
          </>
        )}

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
