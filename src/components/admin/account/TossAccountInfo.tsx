import { adminUserTossAccountAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';

function TossAccountInfo() {
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);
  const status = tossAccountInfo ? 'registered' : 'unregistered';

  const handleRegisterQr = () => {
    // TODO: QR 등록 모달 열기 또는 관련 로직 실행
    console.log('QR 등록 클릭');
  };

  const handleDeleteQr = () => {
    // TODO: QR 삭제 확인 또는 관련 로직 실행
    console.log('QR 삭제 클릭');
  };

  return (
    <RegisterAccountInfoContainer
      title="등록된 토스 QR"
      secondaryButton={{
        text: 'QR 삭제',
        onClick: handleDeleteQr,
        disabled: !tossAccountInfo,
      }}
      primaryButton={{
        text: 'QR 등록',
        onClick: handleRegisterQr,
      }}
    >
      <RegistrationStatusInfo status={status} />
    </RegisterAccountInfoContainer>
  );
}

export default TossAccountInfo;
