import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { adminUserAccountAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import { ACCOUNT_INFO } from '@constants/data/accountData';
import RegisterAccountInfoContainer from './RegisterAccountInfoContainer';
import RegistrationStatusInfo from './RegistrationStatusInfo';

const DetailsWrapper = styled.div`
  width: 100%;
  height: 86%;
  gap: 12px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

const AccountInfoRow = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'flex-start' })}
`;

const InfoLabel = styled.span`
  font-size: 16px;
  color: #464a4d;
  font-weight: 700;
`;

const ValueBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${Color.WHITE};
  border-bottom: 1px solid #e8eef2;
  padding-left: 12px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ValueText = styled.span`
  font-size: 16px;
  color: #464a4d;
  font-weight: 400;
`;

function AccountInfo() {
  const accountInfo = useAtomValue(adminUserAccountAtom);

  const handleRegisterAccount = () => {
    // TODO: 계좌 등록 모달 열기 또는 관련 로직 실행
    console.log('계좌 등록 클릭');
  };

  const handleDeleteAccount = () => {
    // TODO: 계좌 삭제 확인 또는 관련 로직 실행
    console.log('계좌 삭제 클릭');
  };

  const content = accountInfo ? (
    <DetailsWrapper>
      <AccountInfoRow>
        <InfoLabel>{ACCOUNT_INFO.BANK_NAME_LABEL}</InfoLabel>
        <ValueBox>
          <ValueText>{accountInfo.bankName}</ValueText>
        </ValueBox>
      </AccountInfoRow>
      <AccountInfoRow>
        <InfoLabel>{ACCOUNT_INFO.HOLDER_LABEL}</InfoLabel>
        <ValueBox>
          <ValueText>{accountInfo.accountHolder}</ValueText>
        </ValueBox>
      </AccountInfoRow>
      <AccountInfoRow>
        <InfoLabel>{ACCOUNT_INFO.ACCOUNT_NUMBER_LABEL}</InfoLabel>
        <ValueBox>
          <ValueText>{accountInfo.accountNumber}</ValueText>
        </ValueBox>
      </AccountInfoRow>
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
