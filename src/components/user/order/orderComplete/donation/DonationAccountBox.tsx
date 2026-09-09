// 후원 모달 디자인 탐색용. 팀이 방향을 정하면 진 브랜치는 삭제된다.
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { DONATION_ACCOUNT, formatDonationAccountNo } from '@utils/donation';

const Box = styled.div`
  padding: 12px;
  border: 0.5px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  gap: 12px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const InfoRow = styled.div`
  width: 100%;
  gap: 8px;
  font-size: 13px;
  font-weight: 400;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })};
`;

const Key = styled.div`
  flex-shrink: 0;
  color: ${Color.TEXT_BODY};
  ${rowFlex({ justify: 'end', align: 'center' })};
`;

const Value = styled.div`
  gap: 2px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  text-align: right;
  ${colFlex({ justify: 'start', align: 'flex-end' })};
`;

const AccountNo = styled.span`
  font-variant-numeric: tabular-nums;
`;

function DonationAccountBox() {
  return (
    <Box>
      <InfoRow>
        <Key>은행</Key>
        <Value>{DONATION_ACCOUNT.bankName}</Value>
      </InfoRow>
      <InfoRow>
        <Key>계좌번호</Key>
        <Value>
          <AccountNo>{formatDonationAccountNo(DONATION_ACCOUNT.accountNo)}</AccountNo>
        </Value>
      </InfoRow>
      <InfoRow>
        <Key>예금주</Key>
        <Value>{DONATION_ACCOUNT.holderName}</Value>
      </InfoRow>
    </Box>
  );
}

export default DonationAccountBox;
