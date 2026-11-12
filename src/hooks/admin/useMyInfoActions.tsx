import { useNavigate } from 'react-router-dom';
import useConfirm from '@hooks/useConfirm';
import useModal from '@hooks/useModal';
import useAuthentication from '@hooks/useAuthentication';
import { MyInfoCardData } from '@constants/data/myInfoData';
import { USER_ROUTES } from '@constants/routes';

export const useMyInfoActions = () => {
  const navigate = useNavigate();
  const { logout } = useAuthentication();
  const { isModalOpen: isWithdrawModalOpen, openModal: openWithdrawModal, closeModal: closeWithdrawModal } = useModal();

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
          navigate(USER_ROUTES.HOME);
        }
        break;

      case 'deleteAccount':
        openWithdrawModal();
        break;
    }
  };

  return {
    handleCardAction,
    LogoutConfirmModal,
    isWithdrawModalOpen,
    closeWithdrawModal,
  };
};
