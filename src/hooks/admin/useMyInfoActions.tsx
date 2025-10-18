import { useNavigate } from 'react-router-dom';
import useConfirm from '@hooks/useConfirm';
import useAdminUser from '@hooks/admin/useAdminUser';
import useAuthentication from '@hooks/useAuthentication';
import { MyInfoCardData } from '@resources/data/myInfoData';

export const useMyInfoActions = () => {
  const navigate = useNavigate();
  const { deleteUser } = useAdminUser();
  const { logout } = useAuthentication();

  const { ConfirmModal: DeleteUserConfirmModal, confirm: deleteUserConfirm } = useConfirm({
    title: '계정을 탈퇴하시겠습니까?',
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '확인',
    cancelText: '취소',
  });

  const { ConfirmModal: LogoutConfirmModal, confirm: logoutConfirm } = useConfirm({
    title: '로그아웃 하시겠습니까?',
    description: '현재 세션에서 로그아웃됩니다.',
    okText: '확인',
    cancelText: '취소',
  });

  const handleCardAction = async (card: MyInfoCardData) => {
    switch (card.action) {
      case 'navigate':
        if (card.navigationPath) {
          navigate(card.navigationPath);
        }
        break;

      case 'logout':
        const logoutConfirmed = await logoutConfirm();
        if (logoutConfirmed) {
          await logout();
          navigate('/');
        }
        break;

      case 'deleteAccount':
        const deleteConfirmed = await deleteUserConfirm();
        if (deleteConfirmed) {
          deleteUser();
        }
        break;
    }
  };

  return {
    handleCardAction,
    DeleteUserConfirmModal,
    LogoutConfirmModal,
  };
};
