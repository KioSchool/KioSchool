import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import useWorkspace from '@hooks/user/useWorkspace';
import { useSearchParams } from 'react-router-dom';
import { Account } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TitleContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const TitleLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const AccountInfo = styled.div`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  box-sizing: border-box;
  gap: 8px;
  ${colFlex({ justify: 'center' })}
`;

const CopyButton = styled.button`
  height: 20px;
  font-size: 11px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.GREY};
  border-radius: 20px;
  padding: 0 10px;
  color: ${Color.BLACK};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const InfoRow = styled.div`
  width: 100%;
  gap: 5px;
  font-size: 13px;
  font-weight: 400;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Key = styled.div`
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const Value = styled.div`
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

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
        <TitleLabel>계좌 정보</TitleLabel>
        <CopyButton onClick={copyAccountInfo}>계좌 복사하기</CopyButton>
      </TitleContainer>
      <AccountInfo>
        <InfoRow>
          <Key>금융기관</Key>
          <Value>{accountInfo?.bank?.name}</Value>
        </InfoRow>
        <InfoRow>
          <Key>계좌번호</Key>
          <Value>{accountInfo?.accountNumber}</Value>
        </InfoRow>
        <InfoRow>
          <Key>예금주명</Key>
          <Value>{accountInfo?.accountHolder}</Value>
        </InfoRow>
      </AccountInfo>
    </Container>
  );
}

export default OrderAccountInfo;
