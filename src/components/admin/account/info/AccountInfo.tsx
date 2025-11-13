import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { adminUserAccountAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { ACCOUNT_INFO } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';
import AccountInfoItem from './AccountInfoItem';
import { useLocation } from 'react-router-dom';
import RegisterAccount from '@components/admin/account/register/RegisterAccount';
import { RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminUser from '@hooks/admin/useAdminUser';

const DetailsWrapper = styled.div`
  width: 100%;
  height: 86%;
  gap: 12px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

function AccountInfo() {
  const location = useLocation();
  const accountInfo = useAtomValue(adminUserAccountAtom);
  const { deleteAccount } = useAdminUser();

  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const handleRegisterAccount = () => {
    setExternalSidebar({
      location: location,
      title: '계좌 등록',
      subtitle: '* 편집 중 창을 닫지 마세요.',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <RegisterAccount />,
    });
  };

  const handleDeleteAccount = () => {
    //TODO : 새로운 디자인의 공통 컨펌 컴포넌트로 변경 필요
    if (window.confirm('현재 등록된 계좌를 삭제하시겠습니까?')) {
      try {
        deleteAccount();
      } catch (error) {
        console.error('계좌 삭제 중 오류 발생:', error);
        alert('계좌 삭제 중 오류가 발생했습니다.');
      }
    }
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
        disabled: !accountInfo.accountNumber,
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
