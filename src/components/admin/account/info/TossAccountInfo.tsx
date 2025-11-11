import RegisterTossAccount from '@components/admin/account/register/RegisterTossAccount';
import { TOSS_ACCOUNT_INFO, TOSS_MODAL } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import { adminUserTossAccountAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import type { RightSidebarModalPayload } from '@hooks/useRightSidebarModalController';

interface TossAccountInfoProps {
  onOpenModal: (payload: RightSidebarModalPayload) => void;
}

function TossAccountInfo({ onOpenModal }: TossAccountInfoProps) {
  const tossAccountInfo = useAtomValue(adminUserTossAccountAtom);

  const status = tossAccountInfo ? 'registered' : 'unregisteredTossQR';

  const handleRegisterQR = () => {
    onOpenModal({
      title: TOSS_MODAL.TITLE,
      subtitle: TOSS_MODAL.SUBTITLE,
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
