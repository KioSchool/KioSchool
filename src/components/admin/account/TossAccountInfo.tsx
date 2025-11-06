import { adminUserTossAccountAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import { TOSS_ACCOUNT_INFO } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';

function TossAccountInfo() {
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);
  const status = tossAccountInfo ? 'registered' : 'unregistered';

  const handleRegisterQR = () => {
    // TODO: QR 등록 모달 열기 또는 관련 로직 실행
    console.log('QR 등록 클릭');
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
