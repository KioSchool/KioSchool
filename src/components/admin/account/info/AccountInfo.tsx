import RegisterAccount from '@components/admin/account/register/RegisterAccount';
import styled from '@emotion/styled';
import { ACCOUNT_INFO } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import AccountInfoItem from './AccountInfoItem';
import { colFlex } from '@styles/flexStyles';
import { adminUserAccountAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

const DetailsWrapper = styled.div`
  width: 100%;
  height: 86%;
  gap: 12px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

function AccountInfo() {
  const location = useLocation();
  const accountInfo = useAtomValue(adminUserAccountAtom);
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const handleRegisterAccount = () => {
    setExternalSidebar({
      router: location.pathname,
      title: '계좌 등록',
      action: 'OPEN',
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
