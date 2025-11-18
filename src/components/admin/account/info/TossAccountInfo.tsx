import { useLocation } from 'react-router-dom';
import { adminUserAccountAtom, adminUserTossAccountAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { TOSS_ACCOUNT_INFO, TOSS_MODAL } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminUser from '@hooks/admin/useAdminUser';
import useConfirm from '@hooks/useConfirm';

function TossAccountInfo() {
  const location = useLocation();
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);
  const accountInfo = useAtomValue(adminUserAccountAtom);
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { deleteTossAccount } = useAdminUser();

  const status = tossAccountInfo ? 'registered' : 'unregisteredTossQR';

  const { ConfirmModal, confirm } = useConfirm({
    title: `현재 등록된 QR을 삭제하시겠습니까?`,
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '삭제하기',
    cancelText: '취소',
  });

  const handleRegisterQR = () => {
    setExternalSidebar({
      location: location,
      title: TOSS_MODAL.TITLE,
      subtitle: TOSS_MODAL.SUBTITLE,
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <RegisterTossAccount />,
    });
  };

  const handleDeleteQR = async () => {
    const userInput = await confirm();
    if (!userInput) return;
    deleteTossAccount();
  };

  return (
    <RegisterAccountInfoContainer
      title={TOSS_ACCOUNT_INFO.TITLE}
      secondaryButton={{
        text: TOSS_ACCOUNT_INFO.SECONDARY_BUTTON,
        onClick: handleDeleteQR,
        disabled: !tossAccountInfo,
      }}
      primaryButton={{
        text: TOSS_ACCOUNT_INFO.PRIMARY_BUTTON,
        onClick: handleRegisterQR,
        disabled: !!tossAccountInfo || !accountInfo?.accountNumber,
      }}
      infoTooltip={TOSS_ACCOUNT_INFO.TOOLTIP}
    >
      <RegistrationStatusInfo status={status} />
      <ConfirmModal />
    </RegisterAccountInfoContainer>
  );
}

export default TossAccountInfo;
