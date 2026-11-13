import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { RiBankLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { Account, PaymentMethod, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { externalSidebarAtom } from '@jotai/atoms';
import { ACCOUNT_MODAL } from '@constants/data/accountData';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import { getPayAppUrl, hasRegisteredAccount } from '@utils/payMethods';
import useAdminUser from '@hooks/admin/useAdminUser';
import useConfirm from '@hooks/useConfirm';
import ToggleButton from '@components/common/toggle/ToggleButton';
import RegisterAccount from '@components/admin/account/register/RegisterAccount';

const Row = styled.div`
  width: 100%;
  gap: 20px;
  ${rowFlex({ align: 'stretch' })}
`;

const Card = styled.section<{ dimmed?: boolean }>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 153px;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  opacity: ${({ dimmed }) => (dimmed ? 0.5 : 1)};
  ${colFlex({ justify: 'space-between' })}
`;

const Header = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const IconTile = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${Color.LIGHT_GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const LogoTile = styled.img<{ bordered: boolean }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: ${({ bordered }) => (bordered ? `1px solid ${Color.BORDER_GREY}` : 'none')};
`;

const Title = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const Name = styled.h2`
  margin: 0;
  white-space: nowrap;
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;

const Badge = styled.span<{ active: boolean }>`
  padding: 3px 10px 3px 9px;
  gap: 5px;
  border-radius: 12px;
  background: ${({ active }) => (active ? Color.GREEN_FAINT : '#f0f5f8')};
  color: ${({ active }) => (active ? Color.GREEN : '#697278')};
  font-size: 11px;
  font-weight: 700;
  ${rowFlex({ align: 'center' })}

  &::before {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ active }) => (active ? Color.GREEN : '#b8c0c5')};
    content: '';
  }
`;

const Actions = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const TextButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: #9aa1a6;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
`;

const PillButton = styled.button<{ primary?: boolean }>`
  height: 32px;
  padding: 0 14px;
  border-radius: 16px;
  border: ${({ primary }) => (primary ? 'none' : `1px solid ${Color.BORDER_GREY}`)};
  background: ${({ primary }) => (primary ? Color.KIO_ORANGE : Color.WHITE)};
  color: ${({ primary }) => (primary ? Color.WHITE : '#464a4d')};
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const ToggleBox = styled.div<{ disabled: boolean }>`
  flex-shrink: 0;
  width: 112px;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  // 공용 ToggleButton은 넓은 자리(좌우 50px 여백)용이다. 112px 카드 토글에서는 여백을 빼야
  // 손잡이가 밖으로 넘치지 않고 '켜짐'이 한 줄로 가운데 온다(Figma 손잡이 65px)
  div {
    padding: 0;
  }

  p {
    white-space: nowrap;
  }
`;

const Info = styled.div`
  gap: 2px;
  ${colFlex({ align: 'start' })}
`;

const InfoLabel = styled.span`
  color: #697278;
  font-size: 13px;
`;

const InfoValue = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
`;

// '신한은행' → '신한'. 카드 아래 '받는 계좌' 한 줄에 쓴다
const shortBankName = (name: string) => name.replace(/은행$/, '');

interface PayAppCardProps {
  method: PaymentMethod.TOSS | PaymentMethod.KAKAOPAY;
  account: Account | null;
}

function PayAppCard({ method, account }: PayAppCardProps) {
  const { setPayAppEnabled } = useAdminUser();
  const style = PAY_METHOD_STYLE[method];
  const hasAccount = hasRegisteredAccount(account);
  const enabled = hasAccount && Boolean(getPayAppUrl(account, method));
  const badge = !hasAccount ? '계좌 필요' : enabled ? '켜짐' : '꺼짐';

  return (
    <Card dimmed={!hasAccount}>
      <Header>
        {style.logo && <LogoTile src={style.logo} alt="" bordered={style.logoBordered} />}
        <Title>
          <Name>{style.label} 송금</Name>
          <Badge active={enabled}>{badge}</Badge>
        </Title>
        <ToggleBox disabled={!hasAccount} aria-label={`${style.label} 송금 ${enabled ? '끄기' : '켜기'}`}>
          <ToggleButton checked={enabled} onChange={(next) => setPayAppEnabled(method, next)} onText="켜짐" offText="꺼짐" />
        </ToggleBox>
      </Header>
      <Info>
        <InfoLabel>받는 계좌</InfoLabel>
        <InfoValue>{hasAccount && account ? `${shortBankName(account.bank.name)} ${account.accountNumber}` : '계좌를 등록하면 자동으로 켜져요'}</InfoValue>
      </Info>
    </Card>
  );
}

interface AccountCardProps {
  account: Account | null;
}

function AccountCard({ account }: AccountCardProps) {
  const location = useLocation();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { deleteAccount } = useAdminUser();
  const { ConfirmModal, confirm } = useConfirm({
    title: '현재 등록된 계좌를 삭제하시겠습니까?',
    description: '확인 후 되돌릴 수 없습니다.',
    okText: '삭제하기',
    cancelText: '취소',
  });
  const hasAccount = hasRegisteredAccount(account);

  const openRegisterSidebar = () => {
    setExternalSidebar({
      location,
      title: ACCOUNT_MODAL.TITLE,
      subtitle: ACCOUNT_MODAL.SUBTITLE,
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <RegisterAccount />,
    });
  };

  const handleDelete = async () => {
    if (!(await confirm())) return;
    deleteAccount();
  };

  let actions: ReactNode = (
    <PillButton type="button" primary onClick={openRegisterSidebar}>
      계좌 등록
    </PillButton>
  );
  let info: ReactNode = <InfoLabel>아직 등록한 계좌가 없어요</InfoLabel>;

  if (hasAccount && account) {
    actions = (
      <>
        <TextButton type="button" onClick={handleDelete}>
          삭제
        </TextButton>
        <PillButton type="button" onClick={openRegisterSidebar}>
          변경
        </PillButton>
      </>
    );
    info = (
      <>
        <InfoLabel>
          {account.bank.name} · 예금주 {account.accountHolder}
        </InfoLabel>
        <InfoValue>{account.accountNumber}</InfoValue>
      </>
    );
  }

  return (
    <Card>
      <Header>
        <IconTile>
          <RiBankLine size={20} color="#5c5c5c" />
        </IconTile>
        <Title>
          <Name>입금받을 계좌</Name>
          <Badge active={hasAccount}>{hasAccount ? '등록됨' : '등록 전'}</Badge>
        </Title>
        <Actions>{actions}</Actions>
      </Header>
      <Info>{info}</Info>
      <ConfirmModal />
    </Card>
  );
}

interface AccountCardsProps {
  account: Account | null;
}

// 계좌 관리 화면 위쪽 카드 세 장: 입금받을 계좌 · 토스 송금 · 카카오페이 송금
function AccountCards({ account }: AccountCardsProps) {
  return (
    <Row>
      <AccountCard account={account} />
      <PayAppCard method={PaymentMethod.TOSS} account={account} />
      <PayAppCard method={PaymentMethod.KAKAOPAY} account={account} />
    </Row>
  );
}

export default AccountCards;
