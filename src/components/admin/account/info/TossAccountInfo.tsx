import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import { TOSS_ACCOUNT_INFO } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import { adminUserTossAccountAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

function TossAccountInfo() {
  const location = useLocation();
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const status = tossAccountInfo ? 'registered' : 'unregisteredTossQR';

  const handleRegisterQR = () => {
    setExternalSidebar({
      router: location.pathname,
      title: '토스 QR 등록',
      action: 'OPEN',
      content: <RegisterTossAccount />,
    });
  };

  const handleDeleteQR = () => {
    // TODO: QR 삭제 확인 또는 관련 로직 실행
    console.log('QR 삭제 클릭');
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
      }}
      infoTooltip={TOSS_ACCOUNT_INFO.TOOLTIP}
    >
      <RegistrationStatusInfo status={status} />
    </RegisterAccountInfoContainer>
  );
}

export default TossAccountInfo;
