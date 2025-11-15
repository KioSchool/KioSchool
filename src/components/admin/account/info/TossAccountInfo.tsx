import { useLocation } from 'react-router-dom';
import { adminUserAccountAtom, adminUserTossAccountAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { TOSS_ACCOUNT_INFO, TOSS_MODAL } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminUser from '@hooks/admin/useAdminUser';

function TossAccountInfo() {
  const location = useLocation();
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);
  const accountInfo = useAtomValue(adminUserAccountAtom);
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { deleteTossAccount } = useAdminUser();

  const status = tossAccountInfo ? 'registered' : 'unregisteredTossQR';

  const handleRegisterQR = () => {
    setExternalSidebar({
      location: location,
      title: TOSS_MODAL.TITLE,
      subtitle: TOSS_MODAL.SUBTITLE,
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <RegisterTossAccount />,
    });
  };

  const handleDeleteQR = () => {
    //TODO : 새로운 디자인의 공통 컨펌 컴포넌트로 변경 필요
    if (window.confirm('현재 등록된 Toss QR 정보를 삭제하시겠습니까?')) {
      try {
        deleteTossAccount();
      } catch (error) {
        console.error('QR 삭제 중 오류 발생:', error);
        alert('QR 삭제 중 오류가 발생했습니다.');
      }
    }
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
    </RegisterAccountInfoContainer>
  );
}

export default TossAccountInfo;
