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
  gap: 12px;
  ${colFlex({ justify: 'center' })}
`;

const CopyButton = styled.button`
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-weight: 600;
  background: ${Color.KIO_ORANGE};
  border: none;
  border-radius: 8px;
  color: ${Color.WHITE};
  cursor: pointer;
  margin-top: 8px;
  ${rowFlex({ justify: 'center', align: 'center' })}
  &:active {
    opacity: 0.8;
  }
`;

const InfoRow = styled.div`
  width: 100%;
  gap: 5px;
  font-size: 14px;
  font-weight: 400;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Key = styled.div`
  color: ${Color.GREY};
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

const Value = styled.div`
  font-weight: 600;
  color: ${Color.BLACK};
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
        <TitleLabel>입금하실 계좌 정보</TitleLabel>
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
        <CopyButton onClick={copyAccountInfo}>
          계좌 복사하기
        </CopyButton>
      </AccountInfo>
    </Container>
  );
}

export default OrderAccountInfo;
