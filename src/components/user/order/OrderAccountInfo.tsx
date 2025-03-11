import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import React, { useEffect, useState } from 'react';
import useWorkspace from '@hooks/user/useWorkspace';
import { useSearchParams } from 'react-router-dom';
import { Account } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';

const Container = styled.div`
  width: 100%;
  gap: 5px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TitleContainer = styled.div`
  width: 87%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const AccountInfo = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  padding: 10px 20px;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  ${colFlex({ justify: 'center' })}
`;

const CopyButton = styled.button`
  width: 90px;
  height: 23px;
  font-size: 12px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.GREY};
  border-radius: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const InfoRow = styled.div`
  width: 100%;
  gap: 5px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Key = styled.div`
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const Value = styled.div`
  width: 250px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

const Divider = styled.span``;

function OrderAccountInfo() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const [accountInfo, setAccountInfo] = useState<Account>(defaultAccountValue);

  const { fetchWorkspaceAccount } = useWorkspace();

  const getAccountInfo = async () => {
    const account = await fetchWorkspaceAccount(workspaceId);
    if (!account) return;

    setAccountInfo(account);
  };

  const copyAccountInfo = () => {
    const bankName = accountInfo?.bank?.name;
    const accountNumber = accountInfo?.accountNumber;

    navigator.clipboard.writeText(`${bankName} ${accountNumber}`).then(() => {
      alert('계좌 정보가 복사되었습니다.');
    });
  };

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <AppLabel size={15}>계좌 정보</AppLabel>
        <CopyButton onClick={copyAccountInfo}>계좌 복사하기</CopyButton>
      </TitleContainer>
      <AccountInfo>
        <InfoRow>
          <Key>금융기관</Key>
          <Divider>|</Divider>
          <Value>{accountInfo?.bank?.name}</Value>
        </InfoRow>
        <InfoRow>
          <Key>계좌번호</Key>
          <Divider>|</Divider>
          <Value>{accountInfo?.accountNumber}</Value>
        </InfoRow>
        <InfoRow>
          <Key>예금주명</Key>
          <Divider>|</Divider>
          <Value>{accountInfo?.accountHolder}</Value>
        </InfoRow>
      </AccountInfo>
    </Container>
  );
}

export default OrderAccountInfo;
