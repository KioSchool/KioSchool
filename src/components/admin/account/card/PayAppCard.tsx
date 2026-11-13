import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Account, PaymentMethod } from '@@types/index';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import { getPayAppState, getPayAppUrl, hasRegisteredAccount, PAY_APP_STATE_LABEL } from '@utils/payMethods';
import { getLogoBorder } from '@utils/payMethodStyles';
import useAdminUser from '@hooks/admin/useAdminUser';
import ToggleButton from '@components/common/toggle/ToggleButton';
import { Badge, Card, Header, Info, InfoLabel, InfoValue, Name, Title } from './accountCardStyles';

const getPointerEvents = (disabled: boolean) =>
  match(disabled)
    .with(true, () => 'none')
    .otherwise(() => 'auto');

const LogoTile = styled.img<{ bordered: boolean }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: ${({ bordered }) => getLogoBorder(bordered)};
`;

// 공용 ToggleButton은 좌우 50px 여백이 있어 112px 칸에서는 손잡이가 넘치고 글자가 꺾인다
const ToggleBox = styled.div<{ disabled: boolean }>`
  flex-shrink: 0;
  width: 112px;
  pointer-events: ${({ disabled }) => getPointerEvents(disabled)};

  div {
    padding: 0;
  }

  p {
    white-space: nowrap;
  }
`;

const shortBankName = (name: string) => name.replace(/은행$/, '');

const getToggleLabel = (label: string, enabled: boolean) =>
  match(enabled)
    .with(true, () => `${label} 송금 끄기`)
    .otherwise(() => `${label} 송금 켜기`);

interface PayAppCardProps {
  method: PaymentMethod.TOSS | PaymentMethod.KAKAOPAY;
  account: Account | null;
}

function PayAppCard({ method, account }: PayAppCardProps) {
  const { setPayAppEnabled } = useAdminUser();
  const style = PAY_METHOD_STYLE[method];
  const registered = hasRegisteredAccount(account) && account;
  const enabled = Boolean(registered) && Boolean(getPayAppUrl(account, method));
  const state = getPayAppState(Boolean(registered), enabled);

  const handleToggleChange = (next: boolean) => {
    setPayAppEnabled(method, next);
  };

  return (
    <Card dimmed={!registered}>
      <Header>
        {style.logo && <LogoTile src={style.logo} alt="" bordered={style.logoBordered} />}
        <Title>
          <Name>{style.label} 송금</Name>
          <Badge active={enabled}>{PAY_APP_STATE_LABEL[state]}</Badge>
        </Title>
        <ToggleBox disabled={!registered} aria-label={getToggleLabel(style.label, enabled)}>
          <ToggleButton checked={enabled} onChange={handleToggleChange} onText="켜짐" offText="꺼짐" />
        </ToggleBox>
      </Header>
      <Info>
        <InfoLabel>받는 계좌</InfoLabel>
        {registered && <InfoValue>{`${shortBankName(registered.bank.name)} ${registered.accountNumber}`}</InfoValue>}
        {!registered && <InfoValue>계좌를 등록하면 자동으로 켜져요</InfoValue>}
      </Info>
    </Card>
  );
}

export default PayAppCard;
