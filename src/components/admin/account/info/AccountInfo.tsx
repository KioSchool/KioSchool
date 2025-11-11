import RegisterAccount from '@components/admin/account/register/RegisterAccount';
import styled from '@emotion/styled';
import { ACCOUNT_INFO, ACCOUNT_MODAL } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import AccountInfoItem from './AccountInfoItem';
import { colFlex } from '@styles/flexStyles';
import { adminUserAccountAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import type { RightSidebarModalPayload } from '@hooks/useRightSidebarModalController';

const DetailsWrapper = styled.div`
  width: 100%;
  height: 86%;
  gap: 12px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

interface AccountInfoProps {
  onOpenModal: (payload: RightSidebarModalPayload) => void;
}

function AccountInfo({ onOpenModal }: AccountInfoProps) {
  const accountInfo = useAtomValue(adminUserAccountAtom);

  const handleRegisterAccount = () => {
    onOpenModal({
      title: ACCOUNT_MODAL.TITLE,
      subtitle: ACCOUNT_MODAL.SUBTITLE,
      content: <RegisterAccount />,
    });
  };

  const handleDeleteAccount = () => {
    // TODO: 계좌 삭제 확인 또는 관련 로직 실행
    console.log('계좌 삭제 클릭');
  };

  const content =
    accountInfo && accountInfo.accountNumber ? (
      <DetailsWrapper>
        <AccountInfoItem label={ACCOUNT_INFO.BANK_NAME_LABEL} value={accountInfo.bankName} />
        <AccountInfoItem label={ACCOUNT_INFO.HOLDER_LABEL} value={accountInfo.accountHolder} />
        <AccountInfoItem label={ACCOUNT_INFO.ACCOUNT_NUMBER_LABEL} value={accountInfo.accountNumber} />
      </DetailsWrapper>
    ) : (
      <RegistrationStatusInfo status="unregisteredAccount" />
    );

  return (
    <RegisterAccountInfoContainer
      title={ACCOUNT_INFO.TITLE}
      secondaryButton={{
        text: ACCOUNT_INFO.SECONDARY_BUTTON,
        onClick: handleDeleteAccount,
        disabled: !accountInfo,
      }}
      primaryButton={{
        text: ACCOUNT_INFO.PRIMARY_BUTTON,
        onClick: handleRegisterAccount,
      }}
    >
      {content}
    </RegisterAccountInfoContainer>
  );
}

export default AccountInfo;
