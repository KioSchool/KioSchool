import { useLocation } from 'react-router-dom';
import { adminUserTossAccountAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { TOSS_ACCOUNT_INFO } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';

function TossAccountInfo() {
  const location = useLocation();
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const status = tossAccountInfo ? 'registered' : 'unregisteredTossQR';

  const handleRegisterQR = () => {
    setExternalSidebar({
      location: location,
      title: '토스 QR 등록',
      subtitle: '1. 토스 앱 실행\n2. 하단 전체 메뉴 선택\n 3. 사진으로 송금 메뉴 검색\n4. 계좌 선택 후 받을 금액 미설정\n5. QR코드 발급',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
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
