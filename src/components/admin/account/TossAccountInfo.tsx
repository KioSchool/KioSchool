import { adminUserTossAccountAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
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
      title="등록된 토스 QR"
      secondaryButton={{
        text: 'QR 삭제',
        onClick: handleDeleteQR,
        disabled: !tossAccountInfo,
      }}
      primaryButton={{
        text: 'QR 등록',
        onClick: handleRegisterQR,
      }}
      infoTooltip="계좌번호를 복사해 직접 송금할 필요 없이, 바로 토스로 연결되어 간편하게 결제할 수 있습니다."
    >
      <RegistrationStatusInfo status={status} />
    </RegisterAccountInfoContainer>
  );
}

export default TossAccountInfo;
