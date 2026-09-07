// 후원 모달 디자인 탐색용. 팀이 방향을 정하면 진 브랜치는 삭제된다.
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { DONATION_ACCOUNT } from '@utils/donation';

const Box = styled.div`
  padding: 12px;
  border: 0.5px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const Row = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
`;

function DonationAccountBox() {
  return (
    <Box>
      <Row>{DONATION_ACCOUNT.bankName}</Row>
      <Row>{DONATION_ACCOUNT.accountNo}</Row>
      <Row>{DONATION_ACCOUNT.holderName}</Row>
    </Box>
  );
}

export default DonationAccountBox;
